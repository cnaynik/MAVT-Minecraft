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
// ============================================================

addServer({
  name: "vanilla-test",
  ip: "mc.willisch.xyz",
  description: "IP-Adresse:",

  
  },
});
