// ============================================================
//  EIN SERVER PRO DATEI
//  Neuer Server = neue Datei mit der nächsten Nummer (2.js, 3.js …)
//  im Ordner "servers/". Einfach diese Datei kopieren und anpassen.
//  Nicht mehr gebraucht? Datei löschen – bei Lücken von mehr als
//  2 Nummern werden die folgenden Dateien nicht mehr gefunden.
//
//  Felder (nur "ip" ist Pflicht):
//    name         – Anzeigename (sonst wird die IP angezeigt)
//    ip           – Adresse, mit :port falls nicht Standard
//    edition      – "java" (Standard) oder "bedrock"
//    description  – optionaler kurzer Text auf der Karte
//    iconOverride – optional eigene Grafik, z. B. "assets/create.png"
//    modpack      – optional, zeigt einen Modpack-Button:
//                     url   – Link zum Modpack (Pflicht)
//                     label – Button-Text (Standard: "Download modpack")
//                     note  – kleiner Hinweis, z. B. Launcher oder Version
//                   Ohne Modpack: Feld weglassen oder auskommentieren.
//    whitelist    – false = keine Whitelist (Abzeichen „No whitelist“)
//                   Objekt = Whitelist mit Anleitung; das Abzeichen
//                   „Whitelist“ öffnet sie als Pop-up:
//                     { intro: "…", steps: ["…", "…"],
//                       buttons: [{ label: "…", url: "https://…" }] }
//                   In intro/steps sind <b>fett</b> und <i>kursiv</i> möglich.
//                   weggelassen = Abzeichen „Whitelist“ ohne Pop-up
//    rules        – optional, zeigt das Abzeichen „§ Rulebook §“. Liste von
//                   Regeln, nummeriert als § 1, § 2, …:
//                     { title: "Überschrift", text: `Erklärung` }
//                   Im text: **fett**, *kursiv*, Leerzeile = neuer Absatz.
//    rulesTitle   – optional, Titel im Fenster (Standard: "Rulebook")
//    rulesIntro   – optional, kurzer Text über den Regeln
// ============================================================

addServer({
  name: "Ersti SMP",
  ip: "smp.mc.mavt-gaming.com",
  description: "IP address:",

  whitelist: {
    intro: "Ersti SMP is protected by a whitelist. Here's how to get whitelisted:",
    steps: [
      "Join our Discord (link below).",
     "Send us your <b>Minecraft username</b> (Java Edition) under #whitelist.",
      "We'll add you to the whitelist.",
      "Copy the IP <b>smp.mc.mavt-gaming.com</b>, add it in Minecraft under <i>Multiplayer → Add Server</i> and start playing.",
    ],
    buttons: [
      { label: "Join Discord", url: "https://discord.gg/KSjcCHbVg" },
    ],
  },

  rulesTitle: "Rules (draft)",
  rules: [
    {
      title: "Be a decent human being",
      text: `If people want to chill, let them chill. Don't drag casual players into whatever war might be going on.`,
    },
    {
      title: "No cheating",
      text: `Using mods, resourcepacks, macros, and other resources to gain an unfair advantage is banned.`,
    },
    {
      title: "No griefing of farms or significant builds",
      text: `
What counts as "significant" is up to community consensus, but as a general guideline, an underground base for pure regearing with simple decoration isn't a significant build, but a mona lisa replica with a base inside it is.
(The "loophole" of putting a base inside your own build is intentional, think of it as a reward for your contribution)
Stealing is allowed in any scenario (there's this item called the enderchest), but don't be weird and steal people's building material
`,
    },
    {
      title: "Respawn anchors/end crystals are only allowed in PvP if all parties consent to it",
      text: `We love consensual Crystal PVP :D.`,
    },
    {
      title: "No racism, sexism, homophobia, transphobia, etc.",
      text: `You will be banned :)`,
    },
  ],
});
