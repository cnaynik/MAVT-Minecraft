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
  name: "MAVT Gaming",
  tagline: "Die inoffiziellen Minecraft-Server des D-MAVT 2026 an der ETH Zürich.",

  // Ordner mit den Server-Dateien. Die Seite lädt 1.js, 2.js, 3.js …
  // der Reihe nach, bis 3 Nummern hintereinander fehlen.
  // Die Reihenfolge auf der Seite entspricht der Nummer.
  serverDir: "servers/",

  // Whitelist-Anleitung und Regelwerk stehen pro Server in der
  // jeweiligen Datei in "servers/" (Felder "whitelist" und "rules"),
  // siehe servers/2.js. Sie öffnen sich über die Abzeichen auf der Karte.

  // Aktualisierungsintervall in Sekunden
  refreshSeconds: 60,
};
