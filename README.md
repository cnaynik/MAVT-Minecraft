# D-MAVT Minecraft – Website

Statische Website für den inoffiziellen D-MAVT Minecraft-Server. Läuft direkt auf GitHub Pages, ohne Build-Schritt.

Server-Text (MOTD, inkl. Farben), Server-Icon, Spielerzahl, Version und Online-Spieler werden live über die öffentliche API von [mcsrvstat.us](https://mcsrvstat.us) geladen (Fallback: mcstatus.io).

## Anpassen

Nur `config.js` bearbeiten:

- `servers` – Liste der Server, beliebig viele. Pro Eintrag:
  - `ip` (Pflicht) – z. B. `mc.meinserver.ch` oder `1.2.3.4:25566`
  - `name` – Anzeigename
  - `edition` – `"java"` (Standard) oder `"bedrock"`
  - `description` – kurzer Text unter der Karte
  - `iconOverride` – eigene Grafik, z. B. `assets/survival.png`
- `whitelist` – Text, Schritte und Buttons (gilt für alle Server)
- `rules` – optionale Regeln (`[]` blendet sie aus)

Ab zwei Servern erscheint oben eine Zusammenfassung („1 von 2 Servern online · 3 Spieler gerade aktiv“). Das Favicon ist das Icon des ersten Servers.

## Auf GitHub Pages veröffentlichen

1. Neues Repository auf GitHub anlegen (z. B. `dmavt-minecraft`).
2. Alle Dateien dieses Ordners hochladen (*Add file → Upload files*).
3. *Settings → Pages → Source: Deploy from a branch → Branch: `main` / `(root)`* → Save.
4. Nach ca. 1 Minute ist die Seite unter `https://<dein-name>.github.io/dmavt-minecraft/` erreichbar.

Eigene Domain: unter *Settings → Pages → Custom domain* eintragen.

## Hinweis

Die Status-API cached Ergebnisse einige Minuten, Änderungen am MOTD erscheinen daher leicht verzögert. Damit Icon und MOTD angezeigt werden, muss der Server online und `enable-status=true` in `server.properties` gesetzt sein (Standard).
