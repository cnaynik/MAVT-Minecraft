// ============================================================
//  EINE NEWS PRO DATEI
//  Neue News = neue Datei mit der nächsten Nummer (2.js, 3.js …)
//  im Ordner "news/". Einfach diese Datei kopieren und anpassen.
//  Nicht mehr gebraucht? Datei löschen oder "until" setzen.
//  Bei Lücken von mehr als 2 Nummern werden die folgenden
//  Dateien nicht mehr gefunden.
//
//  Gibt es keine (sichtbaren) News, wird der Block ausgeblendet.
//
//  Felder:
//    title – Überschrift
//    date  – Datum im Format "JJJJ-MM-TT"; neueste News stehen oben
//    until – optional: nach diesem Datum wird die News ausgeblendet
//    text  – Inhalt zwischen `Backticks`, darf mehrere Zeilen haben.
//            **fett**, *kursiv*, [Linktext](https://…)
//            Leerzeile = neuer Absatz
// ============================================================

addNews({
  title: "Stress Test - Ersti SMP",
  date: "2026-09-28",
  until: "2026-09-30",

  text: `
The server will be open tomorrow (Sept 29) at 18:00 for a stress test! We are going to test out the server performance under a large amount of entities, loaded chunks, redstone components, and more! If you want to help out the server so that it doesn't run like a powerpoint presentation on the first day, make sure to get on the server and help us test things out!

Please note that this is NOT the official server start. Everything will be reset after the testing session, and the seed will be changed.

There will be no whitelist for this testing session, so you can also join the server with your alt accounts, if you wish to do so.
You can join with a completely vanilla instance, but I recommend optimization mods so your minecraft doesn't become a slideshow. The server has simple voice chat, appleskin and servux support (for minihud users), so you can also test these out!
- Frank
`,
});
