// ============================================================
//  KONFIGURATION – nur diese Datei musst du anpassen.
//  Server-Text (MOTD), Server-Grafik (Icon), Spielerzahl und
//  Version werden automatisch live von jedem Server geladen.
// ============================================================

window.SERVER_CONFIG = {
  // Anzeigename & Untertitel oben auf der Seite
  name: "D-MAVT Minecraft",
  tagline: "Der inoffizielle Minecraft-Server des D-MAVT an der ETH Zürich.",

  // >>> Deine Server. Beliebig viele Einträge; nur "ip" ist Pflicht.
  //   name         – Anzeigename (sonst wird die IP angezeigt)
  //   ip           – Adresse, mit :port falls nicht Standard
  //   edition      – "java" (Standard) oder "bedrock"
  //   description  – optionaler kurzer Text unter der Karte
  //   iconOverride – optional eigene Grafik, z. B. "assets/survival.png"
  servers: [
    {
      name: "Survival",
      ip: "mc.example.ch",
      description: "Unsere Hauptwelt – Vanilla Survival.",
    },
    {
      name: "Creative",
      ip: "creative.example.ch",
      description: "Bauen ohne Grenzen, z. B. Nachbauten vom ML-Gebäude.",
    },
    // {
    //   name: "Bedrock / Handy",
    //   ip: "mc.example.ch:19132",
    //   edition: "bedrock",
    // },
  ],

  // So kommt man auf die Whitelist (gilt für alle Server)
  whitelist: {
    intro:
      "Die Server sind per Whitelist geschützt, damit sie unter uns MAVTlern bleiben. So wirst du freigeschaltet:",
    steps: [
      "Tritt unserem Discord bei (Link unten) oder schreib uns eine Mail.",
      "Schick deinen <b>Minecraft-Namen</b> (Java Edition) und kurz, dass du am D-MAVT studierst oder arbeitest.",
      "Wir fügen dich zur Whitelist hinzu – meist innerhalb von 24 Stunden.",
      "Server-IP kopieren, in Minecraft unter <i>Multiplayer → Server hinzufügen</i> einfügen und losspielen.",
    ],
    // Buttons unter den Schritten. Einträge mit leerer url werden ausgeblendet.
    buttons: [
      { label: "Discord beitreten", url: "https://discord.gg/DEIN-INVITE" },
      { label: "Mail schreiben", url: "mailto:deine-adresse@ethz.ch?subject=Whitelist%20D-MAVT%20Server" },
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
