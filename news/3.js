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
  title: "Server starts: Today 18:00",
  date: "2026-10-02",
  until: "2026-10-02",

  text: `Be there or be square! Or should I say, be there and be square?

Server ip: smp.mc.mavt-gaming.com
Version: 26.3
We have simple voice chat support!

You can technically join with older versions since the server has viabackwards, but I strongly recommand 26.3 to enjoy all the features (there's a dappled forest near spawn!)

Type your username in ⁠whitelist to get whitelisted!

-Frank

`,
});
