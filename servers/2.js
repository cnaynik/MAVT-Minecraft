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
//                     label – Button-Text (Standard: "Modpack herunterladen")
//                     note  – kleiner Hinweis, z. B. Launcher oder Version
//                   Ohne Modpack: Feld weglassen oder auskommentieren.
//    whitelist    – false = keine Whitelist (Abzeichen „Keine Whitelist“)
//                   Objekt = Whitelist mit Anleitung; das Abzeichen
//                   „Whitelist“ öffnet sie als Pop-up:
//                     { intro: "…", steps: ["…", "…"],
//                       buttons: [{ label: "…", url: "https://…" }] }
//                   In intro/steps sind <b>fett</b> und <i>kursiv</i> möglich.
//                   weggelassen = Abzeichen „Whitelist“ ohne Pop-up
//    rules        – optional, zeigt das Abzeichen „§ Regelwerk §“. Liste von
//                   Regeln, nummeriert als § 1, § 2, …:
//                     { title: "Überschrift", text: `Erklärung` }
//                   Im text: **fett**, *kursiv*, Leerzeile = neuer Absatz.
//    rulesTitle   – optional, Titel im Fenster (Standard: "Regelwerk")
//    rulesIntro   – optional, kurzer Text über den Regeln
// ============================================================

addServer({
  name: "Ersti SMP",
  ip: "smp.mc.mavt-gaming.com",
  description: "IP-Adresse:",

  whitelist: {
    intro: "Ersti SMP ist per Whitelist geschützt. So wirst du gewhitelisted:",
    steps: [
      "Tritt unserem Discord bei (Link unten) und schreibe eine Nachricht.",
      "Schick deinen <b>Minecraft-Namen</b> (Java Edition).",
      "Wir fügen dich zur Whitelist hinzu.",
      "IP <b>smp.mc.mavt-gaming.com</b> kopieren, in Minecraft unter <i>Multiplayer → Server hinzufügen</i> einfügen und losspielen.",
    ],
    buttons: [
      { label: "Discord beitreten", url: "https://discord.gg/2KkZfjtVT" },
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
      text: `Using mods, resource packs, macros or other tools to gain an unfair advantage is prohibited.`,
    },
    {
      title: "No griefing of farms or significant builds",
      text: `
What counts as "significant" is up to community consensus. As a general guideline: an underground base used purely for regearing, with simple decoration, is not a significant build – a Mona Lisa replica with a base inside it is.

(The "loophole" of putting your base inside your own build is intentional – think of it as a reward for your contribution.)

Stealing is allowed in any scenario (there's an item called the ender chest), but don't be weird and steal people's building materials.
`,
    },
    {
      title: "Respawn anchors and end crystals",
      text: `To be decided – depends on the outcome of the poll.`,
    },
    {
      title: "No racism, sexism, homophobia, transphobia, etc.",
      text: `You will be banned :)`,
    },
  ],
});
