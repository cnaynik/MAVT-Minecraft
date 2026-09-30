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
  title: "Stress Test completed - SMP start planned for Friday 2. Nov. 18:00 GMT +2",
  date: "2026-09-30",
  until: "2026-01-02",

  text: `

`,
});
