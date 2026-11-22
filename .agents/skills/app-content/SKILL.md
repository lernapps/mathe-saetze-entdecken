---
name: app-content
description: Use for any content work in this app - researching, writing, extending, correcting or reviewing its competencies, chapters, pages, rounds, questions, exercises, figures, terms or sources. This app's own content decisions; they take precedence over the generic lernapps content skills. Load it before you change any content.
---

# Content guide of this app

Explainer „Dreiecke, Vierecke und Kreise: Sätze entdecken und begründen“, Strang `mathematik/geometrie`, Stufe 7-8, nur Deutsch. Regeln für alle Mathe-Explainer: Epic lernapps/apps#402 (Schreibweisen, Aufgaben, Quellen).

## Curriculum

Gymnasium Sek I, Stufe 7-8 (Hessen als Annahme). Ordnung aus der Lernlandkarte Mathematik (`mathematik.json`); Kerncurriculum und KMK-Standards nicht geöffnet (nicht geprüft). Das Explainer bleibt in seinem Strang: Zeichnen und Abbilden (#397) wird nur in einer Sammel-Wiederholung wiederholt; Ähnlichkeit, Pythagoras, Trigonometrie (#399) fehlen bewusst. Keine Verlinkung auf andere Explainer.

## Competencies

- Kapitel `haus` (Das Haus der Vierecke): `haus-der-vierecke` – Ich kann Vierecke nach ihren Eigenschaften im Haus der Vierecke ordnen und begründen. Seite `haus/haus-der-vierecke`. Recap `haus/recap`: `vierecke-grundfiguren`, `symmetrie`.
- Kapitel `winkel` (Winkelsätze und der Satz des Thales): `winkelsaetze` – Ich kann mit Winkelsätzen und dem Winkelsummensatz fehlende Winkel berechnen. · `kreis-sehne-tangente` – Ich kann Sehne, Sekante und Tangente am Kreis unterscheiden und eine Tangente zeichnen. · `satz-des-thales` – Ich kann den Satz des Thales erklären und bei Konstruktionen anwenden. Seiten `winkel/winkelsaetze`, `winkel/sehne-tangente`, `winkel/thales`. Recap `winkel/recap`: `winkel-messen`, `grundfiguren-eben`, `konstruktionen`.
- Kapitel `dreiecke` (Dreiecke konstruieren und vergleichen): `dreieckskonstruktion` – Ich kann Dreiecke aus Seiten und Winkeln konstruieren und sagen, ob die Konstruktion eindeutig ist. · `kongruenz` – Ich kann erkennen und begründen, dass Figuren deckungsgleich sind, und die Kongruenzsätze für Dreiecke anwenden. · `linien-im-dreieck` – Ich kann Mittelsenkrechten, Winkelhalbierenden und Höhen im Dreieck konstruieren und Um- und Inkreis zeichnen. Seiten `dreiecke/konstruktion`, `dreiecke/kongruenz`, `dreiecke/linien`. Recap `dreiecke/recap`: `konstruktionen`, `winkel-messen`, `bewegungen-figuren`.
Die Exercise-ids je Seite stehen am Ende dieses Abschnitts, sobald die Seiten gebaut sind (Stand: nur `thales` im Bau).

## Content structure

Jede Satz-Seite hat dieselben Abschnitts-ids in dieser Reihenfolge: `einstieg` (Ziel, erste leichte Aufgabe) · `entdecken` (Komponente `Zugmodus`) · `vermutung` (Auswahl „Was bleibt gleich?“) · `warum` (Beweis, eine Zeile je Schritt) · `merke` · `uebung` (mindestens 4 Aufgaben, vom Erkennen zum Anwenden) · `begruendung` (freie Begründung, Selbstvergleich mit Musterbegründung; die App prüft sie nicht). Höchstens 350 Wörter Lesetext. Story (Klasse 7-8): kurze Chat-Nachrichten zweier erfundener Jugendlicher im Schulgarten-Projekt, nur wo sie etwas zeigt; Namen frei erfunden und gemischt, keine Marken. Jedes Kapitel endet mit einem Rückblick. Recap-Seiten: kompakt, ohne Aufgaben, benennen jeden Baustein.

## Terminology

Wörter der Karte (Haus der Vierecke, Winkelsätze, Sehne, Sekante, Tangente, Satz des Thales, Kongruenz, Mittelsenkrechte, Winkelhalbierende, Höhe, Umkreis, Inkreis). Anrede „du“. Dezimalkomma, Minus `−`, Malpunkt `·`, Einheiten mit geschütztem Leerzeichen (`3 cm`), Winkel `90°`, Punkte und Variablen kursiv (*A*, *α*). Brüche gesetzt, nie `3/4`. „Ist ein“ nur für Vierecke im Haus. Gemieden: „Dreieck ist rechtwinklig“ ohne Hinweis auf den Winkel; „SSA“ nie als Kongruenzsatz (nur als Gegenbeispiel).

## Exercise patterns

- Zugmodus (Komponente `Zugmodus`, Datei `src/components/Zugmodus/`): ziehbare Figur, Messwerte. Tastatur: Pfeiltasten bewegen, Tab wechselt den Punkt; `nojs`-Form mit drei Stellungen; Textalternative sagt, was gleich bleibt; `aria-live` für den Messwert. Zeigt nie die Antwort. Je Seite eine Konfiguration (Punkte, Messgrößen).
- Wahr/Falsch mit Begründung, Zuordnen (Viereck ↔ Eigenschaft, Daten `src/data/viereck-eigenschaften.yaml`), Ordnen (nur feste Reihenfolge, z. B. Konstruktionsschritte), Einfach-/Mehrfachwahl mit begründeten Falschoptionen (Kongruenzsatz: SSS, SWS, WSW, SsW, keiner).
- `generated` Winkelaufgaben (Mistakes: Nebenwinkel statt Scheitelwinkel, Summe 90° statt 180°), `generated` Eindeutigkeit (0/1/2 Lösungen, nie unsinnige Größen).
- Zirkelzeichnen wird nicht geprüft: Konstruktion über Ordnen der Schritte und Komponente `Konstruktion`.
- Jede Rückmeldung nennt den Grund und bei häufigen Fehlern den Fehlertyp.

## Figures

Selbst gezeichnetes SVG und Komponenten, nie Bilder aus Schulbüchern. Konventionen: Punkte *A*, *B*, *C* gegen den Uhrzeigersinn; Winkel mit Bogen und Beschriftung (nicht Farbe allein); gesuchte Größe nie beschriftet. Jede Figur hat `alt` (was sie zeigt) und `caption` (worauf achten). 360 px: Figuren skalieren, nebeneinander gestellte Stellungen stapeln.

## Sources

Eigene Herleitungen und eigene Aufgaben; Lernlandkarte Mathematik (lernapps.net). Nicht verwendet: Schulbuchtexte, Arbeitsblätter, KI-Aufgaben ohne Rechenprobe. Keine Dritt-Inhalte nachladen. Rechenprobe der Zufallsaufgaben im Test der Seite.

## Adding a chapter or round

1. Kompetenz der Karte wählen (id, „Ich kann“-Satz nicht umformulieren), nach `requires` einordnen.
2. `src/<kapitel>/chapter.yaml`, Seite `<seite>.yaml` mit den Abschnitts-ids oben; Recap bei Bedarf als eigene Seite ohne Aufgaben.
3. Zugmodus-Konfiguration und Aufgaben nach den Mustern; mindestens 3 Aufgaben je Baustein, die erste ohne Vorwissen lösbar.
4. 1 bis 3 ihrer Übungen in `selfAssessment` aufnehmen, wie Skill `lernapps-explainer-self-assessment` sagt.
5. `npx --no -- lernapps check`, Commit.
