(function () {
  "use strict";
  const C = window.SERVER_CONFIG || {};
  const $ = (id) => document.getElementById(id);

  // Server-Liste (kompatibel mit alter Einzel-Server-Konfiguration)
  const SERVERS = (Array.isArray(C.servers) && C.servers.length
    ? C.servers
    : C.ip ? [{ name: C.name, ip: C.ip, edition: C.edition, iconOverride: C.iconOverride }] : []
  ).filter((s) => s && s.ip);

  // ---------- Statische Inhalte ----------
  document.title = C.name || "Minecraft Server";
  $("site-name").textContent = C.name || "Minecraft Server";
  $("tagline").textContent = C.tagline || "";

  const wl = C.whitelist || {};
  $("wl-intro").textContent = wl.intro || "";
  (wl.steps || []).forEach((s) => {
    const li = document.createElement("li");
    li.innerHTML = s; // eigener Text aus config.js, erlaubt <b>/<i>
    $("wl-steps").appendChild(li);
  });
  (wl.buttons || []).filter((b) => b.url).forEach((b, i) => {
    const a = document.createElement("a");
    a.className = "btn " + (i === 0 ? "btn-eth" : "");
    a.href = b.url;
    a.textContent = b.label;
    if (/^https?:/.test(b.url)) { a.target = "_blank"; a.rel = "noopener"; }
    $("wl-buttons").appendChild(a);
  });

  if (C.rules && C.rules.length) {
    C.rules.forEach((r) => {
      const li = document.createElement("li");
      li.textContent = r;
      $("rules").appendChild(li);
    });
  } else {
    $("rules-card").remove();
  }

  // ---------- MOTD mit §-Farbcodes sicher rendern ----------
  const COLORS = {
    0: "#000000", 1: "#0000AA", 2: "#00AA00", 3: "#00AAAA", 4: "#AA0000", 5: "#AA00AA",
    6: "#FFAA00", 7: "#AAAAAA", 8: "#555555", 9: "#5555FF", a: "#55FF55", b: "#55FFFF",
    c: "#FF5555", d: "#FF55FF", e: "#FFFF55", f: "#FFFFFF",
  };
  function renderMotd(raw) {
    const frag = document.createDocumentFragment();
    let st = { color: null, b: false, i: false, u: false, s: false };
    const reset = () => (st = { color: null, b: false, i: false, u: false, s: false });
    let buf = "";
    const flush = () => {
      if (!buf) return;
      const span = document.createElement("span");
      span.textContent = buf;
      if (st.color) span.style.color = st.color;
      if (st.b) span.style.fontWeight = "bold";
      if (st.i) span.style.fontStyle = "italic";
      const deco = [st.u && "underline", st.s && "line-through"].filter(Boolean).join(" ");
      if (deco) span.style.textDecoration = deco;
      frag.appendChild(span);
      buf = "";
    };
    for (let k = 0; k < raw.length; k++) {
      const ch = raw[k];
      if (ch === "§" && k + 1 < raw.length) {
        const code = raw[k + 1].toLowerCase();
        // Hex-Farbe: §x§R§R§G§G§B§B
        if (code === "x" && k + 13 < raw.length) {
          const hex = raw.substr(k + 2, 12).replace(/§/g, "");
          if (/^[0-9a-f]{6}$/i.test(hex)) { flush(); reset(); st.color = "#" + hex; k += 13; continue; }
        }
        flush();
        if (COLORS[code]) { reset(); st.color = COLORS[code]; }
        else if (code === "l") st.b = true;
        else if (code === "o") st.i = true;
        else if (code === "n") st.u = true;
        else if (code === "m") st.s = true;
        else if (code === "r") reset();
        k++;
        continue;
      }
      buf += ch;
    }
    flush();
    return frag;
  }

  // ---------- Status-APIs ----------
  async function fromMcsrvstat(srv) {
    const bedrock = (srv.edition || "java").toLowerCase() === "bedrock";
    const url = `https://api.mcsrvstat.us/${bedrock ? "bedrock/" : ""}3/${encodeURIComponent(srv.ip)}`;
    const d = await (await fetch(url)).json();
    return {
      online: !!d.online,
      motd: d.motd && d.motd.raw ? d.motd.raw.join("\n") : "",
      icon: d.icon || "",
      players: d.players ? { online: d.players.online, max: d.players.max,
        list: (d.players.list || []).map((p) => ({ name: p.name, uuid: p.uuid })) } : null,
      version: d.protocol && d.protocol.name ? d.protocol.name : d.version || "",
    };
  }
  async function fromMcstatus(srv) {
    const bedrock = (srv.edition || "java").toLowerCase() === "bedrock";
    const url = `https://api.mcstatus.io/v2/status/${bedrock ? "bedrock" : "java"}/${encodeURIComponent(srv.ip)}`;
    const d = await (await fetch(url)).json();
    return {
      online: !!d.online,
      motd: d.motd ? d.motd.raw : "",
      icon: d.icon || "",
      players: d.players ? { online: d.players.online, max: d.players.max,
        list: (d.players.list || []).map((p) => ({ name: p.name_clean, uuid: p.uuid })) } : null,
      version: d.version ? d.version.name_clean || d.version.name || "" : "",
    };
  }
  async function fetchStatus(srv) {
    let s = null;
    try { s = await fromMcsrvstat(srv); } catch (e) { /* weiter zum Fallback */ }
    if (!s || !s.online) {
      try { const alt = await fromMcstatus(srv); if (!s || alt.online) s = alt; } catch (e) {}
    }
    return s;
  }

  // ---------- Karten erzeugen ----------
  const tpl = $("server-tpl");
  const cards = SERVERS.map((srv, idx) => {
    const node = tpl.content.firstElementChild.cloneNode(true);
    const q = (sel) => node.querySelector(sel);
    const el = {
      root: node, icon: q(".server-icon"), status: q(".status"), motd: q(".motd"),
      players: q(".players"), version: q(".version"), playersWrap: q(".players-wrap"),
      list: q(".player-list"), copy: q(".copy"),
    };
    q(".server-name").textContent = srv.name || srv.ip;
    q(".ip").textContent = srv.ip;
    if (srv.description) { q(".server-desc").textContent = srv.description; q(".server-desc").hidden = false; }
    if (srv.iconOverride) setIcon(el, srv.iconOverride, idx);

    el.copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(srv.ip);
      } catch (e) {
        const t = document.createElement("textarea");
        t.value = srv.ip; document.body.appendChild(t); t.select();
        document.execCommand("copy"); t.remove();
      }
      el.copy.textContent = "Kopiert!";
      setTimeout(() => (el.copy.textContent = "IP kopieren"), 2000);
    });

    $("servers").appendChild(node);
    return { srv, el, idx, online: false, count: 0 };
  });

  if (!cards.length) {
    $("servers").innerHTML = '<section class="card">Keine Server in <code>config.js</code> eingetragen.</section>';
  }

  function setIcon(el, src, idx) {
    el.icon.src = src;
    if (idx === 0) $("favicon").href = src; // Favicon = erster Server
  }

  function setStatus(el, kind, text) {
    el.status.className = "status status-" + kind;
    el.status.querySelector("span").textContent = text;
  }

  function renderCard(card, s) {
    const { el, srv, idx } = card;
    if (!s) {
      setStatus(el, "offline", "Status unbekannt");
      el.motd.textContent = "Status konnte nicht geladen werden.";
      card.online = false; card.count = 0;
      return;
    }
    if (!s.online) {
      setStatus(el, "offline", "Offline");
      el.motd.textContent = "Der Server ist gerade nicht erreichbar.";
      el.players.textContent = "0";
      el.playersWrap.hidden = true;
      card.online = false; card.count = 0;
      return;
    }
    setStatus(el, "online", "Online");
    el.motd.textContent = "";
    el.motd.appendChild(renderMotd(s.motd || ""));
    if (!srv.iconOverride && s.icon) setIcon(el, s.icon, idx);
    el.players.textContent = s.players ? `${s.players.online} / ${s.players.max}` : "–";
    el.version.textContent = (s.version || "–").replace(/§./g, "");
    card.online = true;
    card.count = s.players ? s.players.online || 0 : 0;

    const list = s.players && s.players.list ? s.players.list : [];
    el.playersWrap.hidden = list.length === 0;
    el.list.textContent = "";
    list.forEach((p) => {
      const li = document.createElement("li");
      const img = document.createElement("img");
      img.src = `https://mc-heads.net/avatar/${encodeURIComponent(p.uuid || p.name)}/24`;
      img.alt = "";
      img.loading = "lazy";
      img.onerror = () => (img.src = "assets/default-icon.svg");
      const span = document.createElement("span");
      span.textContent = p.name;
      li.append(img, span);
      el.list.appendChild(li);
    });
  }

  function renderSummary() {
    if (cards.length < 2) return; // bei nur einem Server überflüssig
    const on = cards.filter((c) => c.online).length;
    const players = cards.reduce((n, c) => n + c.count, 0);
    $("summary").textContent =
      `${on} von ${cards.length} Servern online · ${players} Spieler gerade aktiv`;
  }

  async function update() {
    await Promise.all(cards.map(async (card) => renderCard(card, await fetchStatus(card.srv))));
    renderSummary();
    $("updated").textContent = "Zuletzt aktualisiert: " +
      new Date().toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit" });
  }

  update();
  setInterval(update, Math.max(30, C.refreshSeconds || 60) * 1000);
})();
