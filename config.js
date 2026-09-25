// ============================================================
//  KONFIGURATION – allgemeine Einstellungen der Seite.
//  Die Server selbst stehen je in einer eigenen Datei im
//  Ordner "servers/" (1.js, 2.js, 3.js, …). Siehe servers/1.js.
//
//  Server-Text (MOTD), Server-Grafik (Icon), Spielerzahl und
//  Version werden automatisch live von jedem Server geladen.
// ============================================================

window.SERVER_CONFIG = {
  // Anzeigename & Untertitel oben auf der Seite
  name: "D-MAVT Minecraft",
  tagline: "Die inoffiziellen Minecraft-Server des D-MAVT 2026 an der ETH Zürich.",

  // Ordner mit den Server-Dateien. Die Seite lädt 1.js, 2.js, 3.js …
  // der Reihe nach, bis 3 Nummern hintereinander fehlen.
  // Die Reihenfolge auf der Seite entspricht der Nummer.
  serverDir: "servers/",

  // So kommt man auf die Whitelist (gilt für alle Server)
  whitelist: {
    intro:
      "Die Server sind per Whitelist geschützt. So wirst du freigeschaltet:",
    steps: [
      "Tritt unserem Discord bei (Link unten) und schreibe eine Nachricht.",
      "Schick deinen <b>Minecraft-Namen</b> (Java Edition) und kurz, dass du am D-MAVT studierst oder arbeitest.",
      "Wir fügen dich zur Whitelist hinzu – meist innerhalb von 24 Stunden.",
      "Server-IP kopieren, in Minecraft unter <i>Multiplayer → Server hinzufügen</i> einfügen und losspielen.",
    ],
    // Buttons unter den Schritten. Einträge mit leerer url werden ausgeblendet.
    buttons: [
      { label: "Discord beitreten", url: "https://discord.gg/X9TbQr5Js" },
      //{ label: "Mail schreiben", url: "mailto:deine-adresse@ethz.ch?subject=Whitelist%20D-MAVT%20Server" },
    ],
  },

  // Optional: kurze Regeln (leer lassen [] zum Ausblenden)
  rules: [
    "Kein Griefing, kein Stehlen.",
    "Respektvoller Umgang – im Chat wie im Spiel.",
    "Keine Cheats oder X-Ray-Mods.",
  ],

  // Aktualisierungsintervall in Sekunden
  refreshSeconds: 60,
};
