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
  name: "ARS",
  ip: "ars.mc.mavt-gaming.com",
  whitelist: false,
  description: "IP-Adresse:",

  modpack: {
    url: "https://mega.nz/folder/GP5ChBiC#9i8eh4CP8EKiGbCnJFegTw",
    label: "Modpack herunterladen",
    note: "NeoForge · Version 1.21.1",
  },
});
