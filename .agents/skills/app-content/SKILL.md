---
name: app-content
description: Use for any content work in this app - researching, writing, extending, correcting or reviewing its competencies, chapters, pages, rounds, questions, exercises, figures, terms or sources. This app's own content decisions; they take precedence over the generic lernapps content skills. Load it before you change any content.
---

# Content guide of this app

Explainer „Dreiecke, Vierecke und Kreise: Sätze entdecken und begründen“, Strang `mathematik/geometrie`, Stufe 7-8, nur Deutsch. Regeln für alle Mathe-Explainer: Epic lernapps/apps#402 (Schreibweisen, Aufgaben, Quellen).

## Curriculum

Gymnasium Sek I, Stufe 7-8 (Hessen als Annahme). Ordnung aus der Lernlandkarte Mathematik (`mathematik.json`); Kerncurriculum und KMK-Standards nicht geöffnet (nicht geprüft). Das Explainer bleibt in seinem Strang: Zeichnen und Abbilden (#397) wird nur in einer Sammel-Wiederholung wiederholt; Ähnlichkeit, Pythagoras, Trigonometrie (#399) fehlen bewusst. Keine Verlinkung auf andere Explainer.

## Competencies

Baustein → Seite (Datei, Übungs-ids). Jede Seite hat `scope`; Abschnitts-ids siehe „Content structure“.

- `haus-der-vierecke` – Ich kann Vierecke nach ihren Eigenschaften im Haus der Vierecke ordnen und begründen. `src/haus/haus-der-vierecke.yaml`: `rechte-winkel`, `zug-viereck` (Komponente), `quadrat-ist-rechteck`, `rechteck-ist-quadrat`, `immer-parallelogramm`, `eigenschaft-zuordnen`, `raute-ist-drachen`, `achsen-zaehlen` (generated aus `src/data/vierecke.yaml`), `quadrat-rechteck-begruenden`. Recap `src/haus/recap.yaml` (`vierecke-grundfiguren`, `symmetrie`).
- `winkelsaetze` – Ich kann mit Winkelsätzen und dem Winkelsummensatz fehlende Winkel berechnen. `src/winkel/winkelsaetze.yaml`: `nebenwinkel-erkennen`, `zug-parallelen`, `parallelen-vermuten`, `zug-dreieck`, `winkelsumme-vermuten`, `dreieckswinkel`, `stufenwinkel-nebenwinkel`, `winkelsumme-pruefen`, `winkelsumme-schritte`, `winkelsumme-begruenden`.
- `kreis-sehne-tangente` – Ich kann Sehne, Sekante und Tangente am Kreis unterscheiden und eine Tangente zeichnen. `src/winkel/sehne-tangente.yaml`: `gemeinsame-punkte`, `zug-kreisgerade`, `wann-beruehrt`, `tangente-winkel`, `begriffe-zuordnen`, `lage-erkennen`, `laengste-sehne`, `tangente-zeichnen`, `tangente-begruenden`.
- `satz-des-thales` – Ich kann den Satz des Thales erklären und bei Konstruktionen anwenden. `src/winkel/thales.yaml` (Musterseite): `winkelsumme-wiederholen`, `zugmodus-thales`, `welcher-winkel`, `nur-durchmesser`, `beta-berechnen`, `rechtwinkliges-dreieck`, `beweis-erkennen`, `thales-begruenden`. Recap `src/winkel/recap.yaml` (`winkel-messen`, `grundfiguren-eben`, `konstruktionen`).
- `dreieckskonstruktion` – Ich kann Dreiecke aus Seiten und Winkeln konstruieren und sagen, ob die Konstruktion eindeutig ist. `src/dreiecke/konstruktion.yaml`: `latten`, `zug-stuecke-konstruktion`, `sss-vermuten`, `ssa-vermuten`, `eindeutig-erkennen`, `kleinste-seite`, `groesste-seite`, `sws-konstruieren`, `ssa-begruenden`. Recap `src/dreiecke/recap.yaml` (`konstruktionen`, `winkel-messen`, `bewegungen-figuren`).
- `kongruenz` – Ich kann erkennen und begründen, dass Figuren deckungsgleich sind, und die Kongruenzsätze für Dreiecke anwenden. `src/dreiecke/kongruenz.yaml`: `deckungsgleich`, `zug-stuecke-kongruenz`, `welche-stuecke`, `satz-zuordnen`, `gleiche-winkel`, `ssa-kleinere-seite`, `winkel-kongruent`, `www-begruenden`.
- `linien-im-dreieck` – Ich kann Mittelsenkrechten, Winkelhalbierenden und Höhen im Dreieck konstruieren und Um- und Inkreis zeichnen. `src/dreiecke/linien.yaml`: `mitte-abstand`, `zug-umkreis`, `umkreis-vermuten`, `zug-inkreis`, `inkreis-vermuten`, `zug-hoehen`, `hoehen-vermuten`, `umkreis-konstruieren`, `inkreis-konstruieren`, `linie-zuordnen`, `umkreis-innen`, `umkreisradius`, `umkreis-begruenden`.

Kapitel `haus`, `winkel`, `dreiecke` in `src/app.yaml`; Seitenreihenfolge in den `chapter.yaml`.

## Content structure

Jede Satz-Seite hat dieselben Abschnitts-ids in dieser Reihenfolge: `einstieg` (Ziel, erste leichte Aufgabe) · `entdecken` (Komponente `Zugmodus`) · `vermutung` (Auswahl „Was bleibt gleich?“) · `warum` (Beweis, eine Zeile je Schritt) · `merke` · `uebung` (mindestens 4 Aufgaben, vom Erkennen zum Anwenden) · `begruendung` (freie Begründung, Selbstvergleich mit Musterbegründung; die App prüft sie nicht). Höchstens 350 Wörter Lesetext. Story (Klasse 7-8): kurze Chat-Nachrichten zweier erfundener Jugendlicher im Schulgarten-Projekt, nur wo sie etwas zeigt; Namen frei erfunden und gemischt, keine Marken. Jedes Kapitel endet mit einem Rückblick. Recap-Seiten (regeln.md Abschnitt 7): Kopf „Das brauchst du für dieses Kapitel“; ein Abschnitt je Voraussetzung von außen (Überschrift = Name des Bausteins der Karte, Reihenfolge der `requires`); Fachbegriffe als `definition` (fett, ein bis zwei Sätze, Beispiel mit Zahlen; jeder Begriff nur einmal im ganzen Explainer, damit das Glossar eindeutig bleibt); je Baustein ein bis zwei Kurztests mit sofortiger Rückmeldung (Komponente `Kurztest`) und der Satz „Wenn du unsicher warst: Lies den Baustein … auf der Lernlandkarte nach“ mit Kartenlink; Schluss „Du bist bereit, wenn du …“ mit den Sätzen der Karte. Der Block `recap` erlaubt keine Aufgaben (Build-Fehler), darum steht der Selbsttest in einer Komponente, die keine Aufgabe der App ist.

## Terminology

Wörter der Karte (Haus der Vierecke, Winkelsätze, Sehne, Sekante, Tangente, Satz des Thales, Kongruenz, Mittelsenkrechte, Winkelhalbierende, Höhe, Umkreis, Inkreis). Anrede „du“. Dezimalkomma, Minus `−`, Malpunkt `·`, Einheiten mit geschütztem Leerzeichen (`3 cm`), Winkel `90°`, Punkte und Variablen kursiv (*A*, *α*). Brüche gesetzt, nie `3/4`. „Ist ein“ nur für Vierecke im Haus. Gemieden: „Dreieck ist rechtwinklig“ ohne Hinweis auf den Winkel; „SSA“ nie als Kongruenzsatz (nur als Gegenbeispiel).

## Exercise patterns

Kurztest (`Kurztest.vue`, `Kurztest.ts`): Frage mit Optionen, genau eine richtig, `info` je Option, Rückmeldung sofort, nichts wird gezählt; nur auf Recap-Seiten. Zugmodus-Komponenten (alle in `src/components/`, je `<Name>.vue`, `<Name>.ts` mit der Logik, `<Name>.test.ts`): `Zugmodus` (Thales, Punkt C auf dem Halbkreis), `Winkelzug` (`kind: parallelen` oder `dreieck`), `Kreisgerade` (Gerade im Abstand d vom Mittelpunkt), `Viereckszug` (Ecken C und D auf dem Gitter), `Dreiecksstuecke` (`modes`: sss, sws, wsw, ssa, www; ein Stück per Regler), `Liniendreieck` (`kind: umkreis`, `inkreis` oder `hoehen`). Gemeinsam: der bewegliche Punkt ist ein SVG-Kreis mit `role="slider"`, `tabindex="0"`, `aria-label` und `aria-valuetext`; Pfeiltasten bewegen ihn, Maus und Touch ziehen ihn; `aria-live` meldet die Messwerte; jede Komponente hat `nojs` mit drei Stellungen und Zahlen; sie misst, sie nennt nie die Aussage („bleibt gleich“). Ein Prop heißt nie wie eine importierte Funktion der Komponente (`measure`), sonst greift die Vorlage die Funktion.
- Wahr/Falsch mit Begründung in `explanation`, Zuordnen (`matching`), Ordnen (`ordering`, nur feste Reihenfolge, z. B. Konstruktionsschritte), Auswahl mit begründeten Falschoptionen (`info` je Option).
- `generated`: Winkel berechnen (`dreieckswinkel`, `stufenwinkel-nebenwinkel`, `beta-berechnen`, `winkel-kongruent`; Mistakes: Summe statt Rest, 360° statt 180°), kleinste und größte Seite (`kleinste-seite`, `groesste-seite`), `achsen-zaehlen` aus `src/data/vierecke.yaml` (Felder `name`, `eigenschaft`, `achsen`), Umkreisradius (`umkreisradius`). Ein Mistake darf für keine gezogene Zahl gleich der Antwort sein (Build prüft; `where` einengen).
- Begründung: `open-task` je Seite, Punkte mit `source` auf `#warum`/`#merke`, die App prüft sie nicht, die Lernenden vergleichen selbst. Dafür steht `scope` auf jeder Seite.
- Zirkelzeichnen wird nicht geprüft: Konstruktion über Ordnen der Schritte.
- Jede Rückmeldung nennt den Grund und bei häufigen Fehlern den Fehlertyp.

## Figures

Selbst gezeichnetes SVG (`src/images/thales-beweis.svg`, `winkelsumme-beweis.svg`, `haus-der-vierecke.svg`, Quelle „eigene Zeichnung“, Lizenz CC0-1.0) und Komponenten, nie Bilder aus Schulbüchern. Konventionen: Punkte *A*, *B*, *C* gegen den Uhrzeigersinn; Winkel mit Bogen und Beschriftung (nicht Farbe allein); gesuchte Größe nie beschriftet. Jede Figur hat `alt` (was sie zeigt) und `caption` (worauf achten). 360 px: Figuren skalieren, nebeneinander gestellte Stellungen stapeln.

## Sources

Eigene Herleitungen und eigene Aufgaben; Lernlandkarte Mathematik (lernapps.net). Nicht verwendet: Schulbuchtexte, Arbeitsblätter, KI-Aufgaben ohne Rechenprobe. Keine Dritt-Inhalte nachladen. Rechenprobe der Zufallsaufgaben im Test der Seite.

## Adding a chapter or round

1. Kompetenz der Karte wählen (id, „Ich kann“-Satz nicht umformulieren), nach `requires` einordnen.
2. `src/<kapitel>/chapter.yaml`, Seite `<seite>.yaml` mit den Abschnitts-ids oben; Recap bei Bedarf als eigene Seite ohne Aufgaben.
3. Zugmodus-Konfiguration und Aufgaben nach den Mustern; mindestens 3 Aufgaben je Baustein, die erste ohne Vorwissen lösbar.
4. 1 bis 3 ihrer Übungen in `selfAssessment` aufnehmen, wie Skill `lernapps-explainer-self-assessment` sagt.
5. `npx --no -- lernapps check`, Commit.

## Rules learned from mistakes

- Formeln: `\angle` ist nicht erlaubt, `\text{Winkel } MCA` benutzen. Lange Formeln in zwei Zeilen teilen (360 px).
- Mit `scope` in `src/app.yaml` braucht jede Seite, auch Recap-Seiten, ein `scope`.
