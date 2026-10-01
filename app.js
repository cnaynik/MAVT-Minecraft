// ============================================================
//  Logik der Status-Seite – hier muss normalerweise nichts
//  angepasst werden. Einstellungen: config.js, Server: servers/*.js
// ============================================================
(function () {
  "use strict";

  const CFG = window.SERVER_CONFIG || {};
  const servers = [];

  // Wird von jeder Datei in servers/ aufgerufen.
  window.addServer = function (s) {
    if (s && s.ip) servers.push(s);
    else console.warn("addServer: Eintrag ohne ip ignoriert", s);
  };

  // Wird von jeder Datei in news/ aufgerufen.
  const news = [];
  window.addNews = function (n) {
    if (n && (n.title || n.text)) { n._n = news.length; news.push(n); }
    else console.warn("addNews: Eintrag ohne title/text ignoriert", n);
  };

  // Alte Konfiguration mit servers: [...] in config.js funktioniert weiterhin.
  if (Array.isArray(CFG.servers)) CFG.servers.forEach(window.addServer);

  const $ = (sel) => document.querySelector(sel);

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[c]);
  }

  function safeUrl(url) {
    const u = String(url || "").trim();
    return /^(https?:|mailto:|\/|\.\/|[\w-]+\/)/i.test(u) ? u : "";
  }

  // MOTD-HTML von der API bereinigen: nur Text und Farben/Formatierung.
  function cleanMotd(html) {
    const doc = new DOMParser().parseFromString("<div>" + (html || "") + "</div>", "text/html");
    const allowed = /^(color|font-weight|font-style|text-decoration)$/;
    function walk(node, out) {
      node.childNodes.forEach((n) => {
        if (n.nodeType === 3) { out.appendChild(document.createTextNode(n.textContent)); return; }
        if (n.nodeType !== 1) return;
        if (n.tagName === "BR") { out.appendChild(document.createElement("br")); return; }
        const span = document.createElement("span");
        const st = n.getAttribute("style") || "";
        st.split(";").forEach((d) => {
          const [k, v] = d.split(":").map((x) => x && x.trim());
          if (k && v && allowed.test(k) && !/url|expression/i.test(v)) span.style.setProperty(k, v);
        });
        walk(n, span);
        out.appendChild(span);
      });
      return out;
    }
    return walk(doc.body.firstChild, document.createDocumentFragment());
  }

  // ---------- Nummerierte Dateien laden: <ordner>/1.js, 2.js, … ----------
  function loadNumberedFiles(dirSetting, fallback) {
    const dir = (dirSetting || fallback).replace(/\/?$/, "/");
    const max = CFG.maxServerFiles || 99;
    const bust = Math.floor(Date.now() / 60000); // Änderungen spätestens nach 1 Min. sichtbar
    return new Promise((resolve) => {
      let n = 1, misses = 0;
      const next = () => {
        if (n > max || misses >= 3) return resolve();
        const el = document.createElement("script");
        el.src = dir + n + ".js?v=" + bust;
        el.onload = () => { misses = 0; n++; el.remove(); next(); };
        el.onerror = () => { misses++; n++; el.remove(); next(); };
        document.head.appendChild(el);
      };
      next();
    });
  }
  const loadServerFiles = () => loadNumberedFiles(CFG.serverDir, "servers/");
  const loadNewsFiles = () => loadNumberedFiles(CFG.newsDir, "news/");

  // ---------- Statische Bereiche ----------
  function renderStatic() {
    if (CFG.name) { $("#site-name").textContent = CFG.name; document.title = CFG.name + " – Server-Status"; }
    if (CFG.tagline) $("#site-tagline").textContent = CFG.tagline;
  }

  // ---------- Server-Karten ----------
  function modpackHtml(mp) {
    if (!mp) return "";
    if (typeof mp === "string") mp = { url: mp };
    const url = safeUrl(mp.url);
    if (!url) return "";
    return '<div class="modpack">' +
      '<span class="label">Modpack benötigt</span>' +
      '<a class="btn" href="' + esc(url) + '" target="_blank" rel="noopener">' +
      esc(mp.label || "Modpack herunterladen") + "</a>" +
      (mp.note ? '<span class="note">' + esc(mp.note) + "</span>" : "") +
      "</div>";
  }

  // ---------- Pop-up-Fenster (Regelwerk & Whitelist pro Server) ----------
  function openDialog(title, introHtml, bodyHtml, opener) {
    const dlg = $("#info-dialog");
    if (!dlg) return;
    dlg.querySelector(".dialog-title").textContent = title;
    dlg.querySelector(".dialog-intro").innerHTML = introHtml || "";
    dlg.querySelector(".dialog-body").innerHTML = bodyHtml || "";
    dlg._opener = opener;
    if (typeof dlg.showModal === "function") dlg.showModal();
    else dlg.setAttribute("open", "");
    dlg.scrollTop = 0;
  }

  function setupDialog() {
    const dlg = $("#info-dialog");
    if (!dlg) return;
    const close = () => {
      if (!dlg.open) return;
      if (typeof dlg.close === "function") dlg.close(); else dlg.removeAttribute("open");
    };
    dlg.querySelector(".dialog-close").addEventListener("click", close);
    // Klick auf den abgedunkelten Hintergrund schliesst das Fenster
    dlg.addEventListener("click", (e) => { if (e.target === dlg) close(); });
    dlg.addEventListener("close", () => { if (dlg._opener) dlg._opener.focus(); });
  }

  // Regelwerk
  function hasRules(s) {
    return Array.isArray(s.rules) && s.rules.length > 0;
  }
  function openRules(s, opener) {
    const body = '<ol class="rulebook">' + s.rules.map((r, i) => {
      if (typeof r === "string") r = { title: r };
      return '<li class="rule">' +
        '<h3><span class="para">§ ' + (i + 1) + "</span>" + esc(r.title || "") + "</h3>" +
        (r.text ? '<div class="rule-text">' + miniMarkdown(r.text) + "</div>" : "") +
        "</li>";
    }).join("") + "</ol>";
    openDialog((s.name || s.ip) + " – " + (s.rulesTitle || "Regelwerk"),
      s.rulesIntro ? miniMarkdown(s.rulesIntro) : "", body, opener);
  }

  // Whitelist – steht nur in der jeweiligen Server-Datei:
  //   whitelist: false   = keine Whitelist
  //   whitelist: { … }   = Whitelist mit eigener Anleitung (Pop-up)
  //   weggelassen/true   = Whitelist ohne Anleitung (nur Anzeige)
  function whitelistInfo(s) {
    const w = s.whitelist;
    if (!w || typeof w !== "object") return null;
    const wl = { intro: w.intro || "", steps: w.steps || [], buttons: w.buttons || [] };
    return (wl.intro || wl.steps.length || wl.buttons.length) ? wl : null;
  }
  function openWhitelist(s, wl, opener) {
    const body =
      (wl.steps.length ? '<ol class="steps">' + wl.steps.map((x) => "<li>" + x + "</li>").join("") + "</ol>" : "") +
      '<div class="btn-row">' + wl.buttons
        .filter((b) => b && safeUrl(b.url))
        .map((b, i) => '<a class="btn' + (i ? " btn-ghost" : "") + '" href="' + esc(safeUrl(b.url)) +
          '" target="_blank" rel="noopener">' + esc(b.label || b.url) + "</a>")
        .join("") + "</div>";
    openDialog((s.name || s.ip) + " – Whitelist", wl.intro ? "<p>" + wl.intro + "</p>" : "", body, opener);
  }

  function buildCard(s) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.state = "loading";
    const edition = (s.edition || "java").toLowerCase() === "bedrock" ? "Bedrock" : "Java";
    const wlInfo = whitelistInfo(s);
    card.innerHTML =
      '<div class="card-head">' +
        '<img class="icon placeholder" alt="" width="56" height="56">' +
        '<div class="head-text">' +
          "<h3>" + esc(s.name || s.ip) + "</h3>" +
          '<span class="status"><span class="dot"></span><span class="status-text">Wird geladen …</span></span>' +
        "</div>" +
        '<div class="players"><strong class="p-count">–</strong><span>Spieler</span></div>' +
      "</div>" +
      '<div class="motd"></div>' +
      '<ul class="meta">' +
        (hasRules(s)
          ? '<li><button type="button" class="tag tag-btn btn-rules" aria-haspopup="dialog">§ Regelwerk §</button></li>'
          : "") +
        (s.whitelist === false
          ? '<li class="tag tag-open">Keine Whitelist</li>'
          : wlInfo
            ? '<li><button type="button" class="tag tag-btn btn-wl" aria-haspopup="dialog">Whitelist</button></li>'
            : '<li class="tag tag-wl">Whitelist</li>') +
        '<li class="tag">' + edition + '</li><li class="tag v-tag" hidden></li></ul>' +
      '<p class="desc">' + esc(s.description || "") + "</p>" +
      '<div class="ip-row"><code>' + esc(s.ip) + "</code>" +
        '<button type="button" class="btn btn-ghost btn-copy">Kopieren</button></div>' +
      modpackHtml(s.modpack) +
      '<details class="player-list" hidden><summary>Wer ist online?</summary><ul></ul></details>';

    const img = card.querySelector(".icon");
    if (s.iconOverride) { img.src = s.iconOverride; img.classList.remove("placeholder"); }

    const copyBtn = card.querySelector(".btn-copy");
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(s.ip);
      } catch (e) {
        const r = document.createRange();
        r.selectNodeContents(card.querySelector("code"));
        const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
        document.execCommand("copy");
      }
      copyBtn.textContent = "Kopiert ✓";
      setTimeout(() => (copyBtn.textContent = "Kopieren"), 1600);
    });

    const wlBtn = card.querySelector(".btn-wl");
    if (wlBtn) wlBtn.addEventListener("click", () => openWhitelist(s, wlInfo, wlBtn));
    const rulesBtn = card.querySelector(".btn-rules");
    if (rulesBtn) rulesBtn.addEventListener("click", () => openRules(s, rulesBtn));

    s._card = card;
    return card;
  }

  async function fetchStatus(s) {
    const bedrock = (s.edition || "").toLowerCase() === "bedrock";
    const url = "https://api.mcsrvstat.us/" + (bedrock ? "bedrock/" : "") + "3/" + encodeURIComponent(s.ip);
    const card = s._card;
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const d = await res.json();
      updateCard(s, d);
    } catch (e) {
      console.warn("Status für", s.ip, "nicht abrufbar:", e);
      card.dataset.state = "offline";
      card.querySelector(".status-text").textContent = "Status nicht abrufbar";
    }
  }

  function updateCard(s, d) {
    const card = s._card;
    const online = !!d.online;
    card.dataset.state = online ? "online" : "offline";
    card.querySelector(".status-text").textContent = online ? "Online" : "Offline";

    const p = d.players || {};
    card.querySelector(".p-count").textContent = online ? (p.online || 0) + " / " + (p.max || 0) : "–";
    s._online = online ? p.online || 0 : 0;
    s._isOnline = online;

    const motd = card.querySelector(".motd");
    motd.textContent = "";
    if (online && d.motd) {
      if (d.motd.html) motd.appendChild(cleanMotd(d.motd.html.join ? d.motd.html.join("\n") : d.motd.html));
      else if (d.motd.clean) motd.textContent = [].concat(d.motd.clean).join("\n");
    }

    const vTag = card.querySelector(".v-tag");
    const version = online && (d.protocol && d.protocol.name || d.version);
    vTag.hidden = !version;
    if (version) vTag.textContent = version;

    const img = card.querySelector(".icon");
    if (!s.iconOverride && d.icon) { img.src = d.icon; img.classList.remove("placeholder"); }

    const details = card.querySelector(".player-list");
    const list = Array.isArray(p.list) ? p.list : [];
    details.hidden = !(online && list.length);
    details.querySelector("ul").innerHTML = list.map((pl) => {
      const name = typeof pl === "string" ? pl : pl.name;
      const id = (pl && pl.uuid) || name;
      return '<li><img alt="" src="https://mc-heads.net/avatar/' + encodeURIComponent(id) + '/18">' + esc(name) + "</li>";
    }).join("");
  }

  function renderSummary() {
    const on = servers.filter((s) => s._isOnline).length;
    const players = servers.reduce((n, s) => n + (s._online || 0), 0);
    $("#summary").textContent = servers.length
      ? on + " von " + servers.length + " Server online · " + players + " Spieler gerade im Spiel"
      : "";
    $("#updated").textContent = "Zuletzt aktualisiert: " +
      new Date().toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }

  async function refreshAll() {
    await Promise.all(servers.map(fetchStatus));
    renderSummary();
  }

  // ---------- News ----------
  // Datum "JJJJ-MM-TT" als lokales Datum lesen (ohne Zeitzonen-Verschiebung).
  function parseDate(str) {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(str || ""));
    return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
  }

  // Kleines, sicheres Markdown: **fett**, *kursiv*, [Text](Link),
  // Leerzeile = neuer Absatz, Zeilenumbruch = neue Zeile.
  function miniMarkdown(text) {
    const src = Array.isArray(text) ? text.join("\n\n") : String(text || "");
    return src.trim().split(/\n\s*\n/).map((para) => {
      let h = esc(para.trim());
      h = h.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, label, url) => {
        const u = safeUrl(url.replace(/&amp;/g, "&"));
        return u ? '<a href="' + esc(u) + '" target="_blank" rel="noopener">' + label + "</a>" : label;
      });
      h = h.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      h = h.replace(/(^|[^*])\*([^*\s][^*]*?)\*/g, "$1<em>$2</em>");
      return "<p>" + h.replace(/\n/g, "<br>") + "</p>";
    }).join("");
  }

  function renderNews() {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const visible = news
      .filter((n) => { const u = parseDate(n.until); return !u || u >= today; })
      .sort((a, b) => {
        const da = parseDate(a.date), db = parseDate(b.date);
        if (da && db && +da !== +db) return db - da;   // neueste zuerst
        if (!!da !== !!db) return da ? -1 : 1;
        return b._n - a._n;                             // sonst höhere Nummer zuerst
      });
    const box = $("#news");
    if (!box) return;
    box.hidden = !visible.length;
    $("#news-list").innerHTML = visible.map((n) => {
      const d = parseDate(n.date);
      const dateHtml = d
        ? '<time class="news-date" datetime="' + esc(n.date) + '">' +
          d.toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit", year: "numeric" }) + "</time>"
        : "";
      return '<article class="panel news-item">' +
        '<div class="news-head">' +
          (n.title ? "<h3>" + esc(n.title) + "</h3>" : "") + dateHtml +
        "</div>" +
        '<div class="news-body">' + miniMarkdown(n.text) + "</div>" +
        "</article>";
    }).join("");
  }

  async function init() {
    renderStatic();
    setupDialog();
    await loadNewsFiles();
    renderNews();
    await loadServerFiles();

    const grid = $("#servers");
    grid.innerHTML = "";
    if (!servers.length) {
      grid.innerHTML = '<p class="empty">Keine Server gefunden. Lege im Ordner <code>servers/</code> eine Datei <code>1.js</code> an.</p>';
      return;
    }
    servers.forEach((s) => grid.appendChild(buildCard(s)));

    await refreshAll();
    const every = Math.max(30, Number(CFG.refreshSeconds) || 60) * 1000;
    setInterval(() => { if (!document.hidden) refreshAll(); }, every);
    document.addEventListener("visibilitychange", () => { if (!document.hidden) refreshAll(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
