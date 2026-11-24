---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, null until chosen in Explore. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: commit
# prePushFailures: failed pre-push runs, written by the hook.
prePushFailures: 0
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: { accessible: 1, app-content-guide: 1, checks-pass: 2 }
---

# Plan: mathe-saetze-entdecken, first version

<!--
For you, the assistant. The process is in AGENTS.md; this plan holds the method.
- `npx --no -- lernapps plan next` prints the task to do now, `plan done` ticks it and prints the next one.
- You write only below Goal, Key decisions, Notes, Answers, Entry draft, Content method and Retrospective, in the
  creator's language. Delete the comment of a section once the section is filled.
- Work on the branch `work`, locally: push nothing before Commit.
-->

*Started 2026-11-22. Explore, Plan, Code, Commit.*

## Goal

<!-- 1–2 sentences: what learners do, what they learn. -->

Lernende der Stufen 7-8 entdecken beim Ziehen an Figuren Sätze der ebenen Geometrie (Vierecke, Winkel, Thales, Dreieckskonstruktion, Kongruenz, besondere Linien) und begründen sie in eigenen Worten.


## Key decisions

<!-- One line each: decision and reason. Archetype first. Your own choice without the creator: mark "(guess)". -->

- Archetyp `explainer`: Lernende brauchen Erklärung, Zugmodus-Bilder und Übungen dazwischen. `quiz` zu knapp (kein Erklärteil), `interactive` ist kein Spiel/Simulation von eigenem Modell. Zugmodus als Vue-Komponente mit statischer Form zuerst.
- Strang `mathematik/geometrie`, Format 2 (aus Issue #430).
- Quellen der Entscheidungen: Issue #430 (Auftrag des Orchestrators), nicht ein Interview. Ziel, Zielgruppe, Kapitel stehen im Issue.
- `scope` in `src/app.yaml` und auf jeder Seite: ja, weil die Begründung je Seite als `open-task` gebaut wird (der Tutor beurteilt sie nach dem Scope). Auch ohne das nützlich, um den Tutor im Strang zu halten.
- Komponentendateien liegen flach in `src/components/` (Skill), nicht im Unterordner; der Content-Guide wird angepasst.

## Notes

<!-- Strand or subject, competencies by chapter (ids), didactic approach, scope, sources and licences, open questions. -->

Strang: mathematik/geometrie. Karte (mathematik.json) gelesen. Alle 7 Bausteine: Lücke (practisedBy leer).
Kapitel und Bausteine (ids, "Ich kann"-Sätze der Karte):
1. Haus der Vierecke: `haus-der-vierecke` (Schritt 1; requires vierecke-grundfiguren, symmetrie).
2. Winkelsätze und Thales: `winkelsaetze` (S1, requires winkel-messen), `kreis-sehne-tangente` (S1, requires grundfiguren-eben), `satz-des-thales` (S2, requires winkelsaetze, konstruktionen, kreis-sehne-tangente).
3. Dreiecke konstruieren und vergleichen: `dreieckskonstruktion` (S1, opens 10; requires konstruktionen, winkel-messen), `kongruenz` (S2; requires bewegungen-figuren, dreieckskonstruktion), `linien-im-dreieck` (S2; requires dreieckskonstruktion).
Hinweis Reihenfolge: dreieckskonstruktion (Schritt 1, öffnet 10) wird von `satz-des-thales` nicht verlangt; Thales braucht `konstruktionen` (aus #397). Kapitel wie im Issue.
Recap (Sammel-Wiederholung je Kapitelanfang, ohne Aufgaben), Bausteine von außerhalb: K1: vierecke-grundfiguren, symmetrie. K2: winkel-messen, grundfiguren-eben, konstruktionen. K3: konstruktionen, winkel-messen, bewegungen-figuren. Alle aus #397/Schicht 1, nicht gelesen, nicht verlinkt.
Übung je Muster der Mathematik-Referenz: Wahr/Falsch mit Begründung, Zuordnen, Ordnen (Beweisschritte), `generated` (Winkel berechnen, Seiten/Winkel-Eindeutigkeit), Zugmodus-Komponenten (ziehen, beobachten, Vermutung wählen).
Konstruktion: der Explainer kann nicht das Zeichnen mit Zirkel prüfen; Komponente mit Schritt-Konstruktion am Bildschirm oder Auswahl der richtigen Schrittfolge (Plan).
Pro Baustein mind. 3 Aufgaben (Regel 3.1). Quellen: eigene Herleitungen, Karte, Hessen/KMK nicht geöffnet = nicht geprüft (Karte gibt die Ordnung).
Nicht Teil: Ähnlichkeit, Pythagoras, Trigonometrie (#399); Zeichnen und Abbilden (#397).

Seiten (eine Kompetenz, eine Seite), Reihenfolge nach requires:
K1 `haus`: Recap (vierecke-grundfiguren, symmetrie) · haus-der-vierecke.
K2 `winkel`: Recap (winkel-messen, grundfiguren-eben, konstruktionen) · winkelsaetze · kreis-sehne-tangente · satz-des-thales.
K3 `dreiecke`: Recap (konstruktionen, winkel-messen, bewegungen-figuren) · dreieckskonstruktion · kongruenz · linien-im-dreieck.
Nicht geübte Voraussetzungen (stehen im Recap): s. oben, alle aus Schicht 1 (#397) bzw. 5-6.
Wie Lernende dahin kommen (Herleitung) · Fehlvorstellung, die die Rückmeldung fängt:
- haus-der-vierecke: Viereck ziehen, bis Merkmal erfüllt; „ist ein“ aus Eigenschaftsmengen · „Quadrat ist kein Rechteck“, „Raute ist ein Quadrat“.
- winkelsaetze: Winkel an Parallelen beim Ziehen gleich, Winkelsumme 180° durch Anlegen der Ecken/Parallele · Stufen- und Wechselwinkel verwechselt; Außenwinkel als Innenwinkel.
- kreis-sehne-tangente: Gerade am Kreis ziehen, Schnittpunkte zählen (0, 1, 2) · Sekante/Sehne verwechselt; Tangente „berührt irgendwo“ statt senkrecht zum Radius.
- satz-des-thales: Punkt auf dem Kreis ziehen, Winkel bleibt 90°; Begründung über zwei gleichschenklige Dreiecke und Winkelsumme · Satz umgedreht oder Punkt innerhalb/außerhalb.
- dreieckskonstruktion: drei Stücke wählen, Dreieck entsteht/entsteht nicht/zwei Lösungen · SSW ohne die Bedingung „größere Seite“; WWW eindeutig.
- kongruenz: Stücke fest, Dreieck ziehen, bleibt es gleich? Daraus SSS, SWS, WSW, SsW · „SSA“ und „WWW“ als Satz.
- linien-im-dreieck: Dreieck ziehen, Schnittpunkt bleibt; Um- und Inkreis · Höhe/Seitenhalbierende verwechselt; Umkreismittelpunkt liegt immer innen.
Scope: drin: alle 7 Bausteine, alle vier Kongruenzsätze, Mittelsenkrechten, Winkelhalbierende, Höhen; Um- und Inkreis. Draußen: Ähnlichkeit, Pythagoras, Trigonometrie (#399); Zeichnen/Abbilden (#397); Seitenhalbierende/Schwerpunkt (nicht im Baustein, Karte: Mittelsenkrechten, Winkelhalbierende, Höhen). Sprache: Deutsch.
Quellen geöffnet: Karte mathematik.json (lernapps.net). Hessen-Kerncurriculum und KMK nicht geöffnet: nicht geprüft; Karte gibt die Ordnung. Hinweis: Das Issue nennt `haus-der-vierecke` als Ausnahme (nur ein Baustein im Kapitel).

Lernenden-Check der Musterseite (unabhängiger Prüfer, Klasse 7): gefunden und behoben: γ am Punkt C nicht markiert (jetzt in Figur), Anfasser sah aus wie Knopf (jetzt der Punkt selbst, fokussierbar), falsche r-Beschriftung im Beweisbild, M nicht im Zugmodus, Schritt 4 sprang zu 2γ (jetzt Schritt 5 und 6), Achtung-Box gab Wahr/Falsch-Antwort preis, Auftrag „Beobachte“ ohne Hinweis, Optionen der Begründungsfrage unterschiedlich lang. Offen/Laufzeit (nicht in dieser App behebbar): Hinweistext „Antworte zuerst: Wähle, tippe oder ordne alles zu“ bei Textfeld; Start bei zufälliger „Aufgabe Nr.“; Rückmeldung bei Wahr/Falsch allgemein („Lies dazu noch einmal“).

## Review (Prüfer, die nicht geschrieben haben)

Abhängigkeiten: #397 (Figuren zeichnen und abbilden), gebaut gegen die Bausteine der Karte; Fremdes in Sammel-Wiederholungen (`recap`).

**Lernenden-Prüfer 1 (Thales, Klasse 7):** 10 Befunde behoben (γ unmarkiert, Anfasser wie Knopf, falsches r im Beweisbild, Sprung in Schritt 4, Merke gab Antwort preis, Auftrag ohne Hinweis, Optionen unterschiedlich lang u. a.).
**Fachlicher Prüfer (alle Seiten, nachgerechnet):** 8 Fehler behoben (nojs-Zahl Inkreis 1,1 cm; falsche Begründung „nur Durchmesser“; Trapez „nur ein Paar“ vs. Definition; C nicht auf dem Kreis im Thales-Bild; Radius-Rückmeldung; SSA-Bedingung in Kongruenz; ARIA-Bereiche; Kreisgerade d = 6 außerhalb des Bildes). Weiter behoben: Beweislücken (Winkelsumme mit Geraden AC/BC, Tangente „Lot“, Mittelsenkrechte mit Umkehrung), Ordnungsaufgaben mit mehreren richtigen Reihenfolgen zusammengelegt, negative Falschoption, Scheitelwinkel in Merke, geschützte Leerzeichen vor cm/m, „man“ entfernt, Aufgaben ergänzt (Raute ist Drachen, SsW im Zuordnen, Inkreis konstruieren), Beweisumbenennung `beweis-erkennen` (Thales hat keine Umkehrung-Aufgabe). Nicht behoben (Entscheidung): Variablen in Aufgabentexten unkursiv (Aufgabentexte können kein Markdown), Passante, Seitenhalbierende (Baustein nennt sie nicht), Höhen-Abstände messen immer 0 (bewusst: sie bestätigen den Treffpunkt).
**Seit den Läufen der Prüfer geändert (Stand `git diff 37c54c9..HEAD`):**
- Nach dem Lauf des Fachprüfers und von Lernenden-Prüfer 2 (er sah teils einen Zwischenstand): alle Fixes aus beiden Berichten. Inhaltlich (Aufgaben, Rückmeldungen, Beweisschritte): neue Aufgaben `raute-ist-drachen`, `inkreis-konstruieren`, SsW im Zuordnen `satz-zuordnen`; geändert `nur-durchmesser`, Info zu Trapez in `immer-parallelogramm`, Falschoption in `stufenwinkel-nebenwinkel`, Ordnungen `winkelsumme-schritte` und `umkreis-konstruieren` (zusammengelegt), Rückmeldung `umkreisradius`, Beweisschritte (Thales 3, 5, 6; Winkelsumme mit Geraden AC und BC; Tangente mit Lot; Mittelsenkrechten mit „Merke vorab“), SSA-Bedingung in `kongruenz`, Scheitelwinkel-Zeile, Merke Thales mit „nicht A oder B“, Aufgabe `umkehrung-erkennen` heißt `beweis-erkennen`. Logik: `Winkelzug.ts` (γ als Rest auf 180° nach Rundung).
- Diese inhaltlichen Stellen prüft ein dritter, kleiner Lauf des fachlichen Prüfers (nur der Diff, nicht die ganze App); sein Ergebnis steht unten.
- Rein mechanisch, nicht erneut geprüft: geschützte Leerzeichen vor cm und m, Maßstab und Koordinaten der Figuren (Viereckszug, Kreisgerade), Gitterpunkte, Winkelbögen, Griff am Geradenende, Buchstabe U/I/H, Legende im Haus-Bild, ARIA-Wertebereiche.
- Ergebnis des dritten, kleinen Fachprüfer-Laufs (nur Diff): keine Fehler. Vier Schwächen behoben (Beschriftungen im Thales-Bild verschoben, SSA-Text mit Winkellage und Fall a = b, Begründung des Spiegelpunkts). Diese vier Änderungen sind nicht erneut geprüft (Text und Koordinaten, kein neuer Beweisschritt).
- Die zwei Hinweise `explainer-text-load` (konstruktion 369, linien 373 Wörter statt 350) bleiben stehen: weiteres Kürzen würde Rückmeldungen und Beweis schlechter machen.

**Lernenden-Prüfer 2 (ganze App, Klasse 7-8):** Befunde in der App behoben: Winkelsumme rundet nicht mehr auf 179,9°/180,1°, Viereckszug mit Gitter, Seitennamen, Startform ohne Eigenschaft und nicht abgeschnitten, Kreisgerade ohne „0 cm Sehne“, Winkelbögen und Griff am Geradenende, Buchstabe U/I/H am Treffpunkt, Lot und Fußpunkt erklärt, Haus-Bild mit Legende ohne Überdeckung, Kongruenz-Text verrät nichts. Offen/Laufzeit (nicht von dieser App behebbar, an den Orchestrator): Zahleneingabe „115 Grad“ wird als leer gewertet; allgemeine Rückmeldung „Lies dazu noch einmal den Text“; „Aufgabe Nr. 55“ zufällig; Quelle/Lizenz-Zeile unter jedem Bild; offene Aufgabe zeigt Musterlösung als Checkliste; Selbsteinschätzungs-Text bei 0 und 20 von 21 gleich.
**Offen (nicht geprüft):** Hessisches Kerncurriculum und KMK nicht geöffnet; Thales-Seite vom zweiten Lernenden-Prüfer nur überflogen (nach Fixes vom ersten Prüfer geprüft); Glossar, Medienübersicht, Touch-Ziehen, Screenreader nicht geprüft; Prüfer 2 sah teils einen Zwischenstand.

**Recaps nach Abschnitt 7 neu geschrieben (Auftrag des Menschen über den Orchestrator):** 3 Recaps (haus, winkel, dreiecke). Aufbau: Kopf, ein Abschnitt je Voraussetzung von außen in Reihenfolge der `requires`, Fachbegriffe als `definition` (20 neue Begriffe im Glossar: Parallel, Rechter Winkel, Benachbart und gegenüberliegend, Diagonale, Symmetrieachse, Punktsymmetrie, Drehsymmetrie, Winkel, Spitzer/Stumpfer/Gestreckter Winkel, Dreieck, Gleichschenkliges Dreieck, Kreis, Radius, Durchmesser, Senkrecht, Lot, Mitte einer Strecke, Abtragen, Antragen, Spiegeln, Verschieben, Drehen, Bildfigur), Beispielkasten, Kurztests mit sofortiger Rückmeldung und Kartenlink, Checkliste „Du bist bereit, wenn du …“. Der Block `recap` erlaubt keine Aufgaben (Build-Fehler), darum die Komponente `Kurztest` (keine Aufgabe der App, nichts wird gezählt). Kein Recap fehlt: jedes Kapitel hat eins, die `requires` der Karte sind abgedeckt.
- **Lernenden-Prüfer (nur Recaps):** konnte Voraussetzungen nur teilweise beurteilen (nur ein Test je Baustein, Tests zu leicht, Checkliste = Kartensatz, Tabelle auf 360 px abgeschnitten, Begriffe Diagonale/Drehsymmetrie/Lot unerklärt). Behoben: zweite Tests (Trapez, Punktsymmetrie, Skalenwahl, Lot, Spiegeln), Tabelle zweispaltig, Begriffe ergänzt, konkrete Checklisten.
- **Fachprüfer (nur neue Texte):** keine Rechenfehler, alle neun Kurztests richtig; Befunde zu Beispielen und Begriffen (Buchbeispiel, Nebenwinkel im Recap vorweggenommen, Zirkel-Satz vage, Spiegeln zirkulär, Mitte/senkrecht im dritten Recap fehlend, Leerzeichen vor Einheiten) behoben.
- **Nicht erneut geprüft:** die Korrekturen nach beiden Recap-Prüfern (zusätzliche Kurztests, Definitionen Diagonale, Drehsymmetrie, Benachbart und gegenüberliegend, Dreieck, geänderte Beispiele und Checklisten). Offen: Glossar-Anzeige durch den Lernenden-Prüfer bestätigt, die Recaps nicht auf Papier/Screenreader geprüft. Hinweise `explainer-text-load` und `explainer-repetition` der Recaps bleiben (Format laut Abschnitt 7 ist textlastig, die Wiederholung „Wenn du unsicher warst …“ ist gewollt).

**Durchgang nach Regeln Abschnitt 9 (sechs Rückmeldungen des Menschen):** (1) Überschrift „Was du hier lernst“ auf 7 Seiten. (2) Sichtbares: Beschriftung B und C in der Dreiecksfigur, Gitterpunkte im Wortlaut, U/I/H im Bild (zuvor), Rest geprüft ohne Befund. (3) Vorgänge: jede Zugmodus-Figur hat das sichtbare Werkzeug (Punkt oder Regler), die Seite sagt, was sich ändert und was gleich bleibt, kein Befund. (4) Kurztests schwerer (fünf ersetzt: halber gestreckter Winkel, Durchmesser 14 cm, Strecke 13 cm, spitzer Winkel auf zwei Skalen, Spiegeln mit 3 cm Abstand). (5) S und W vor der Figur erklärt (Konstruktion, Kongruenz). (6) 40 `links:` an Aufgaben entfernt, `lernapps check` besteht ohne. Geänderte Seiten: 7 Seiten (Überschrift, Links), davon inhaltlich 4 (haus-der-vierecke, konstruktion, kongruenz, beide Recaps winkel und dreiecke) plus die Komponente Dreiecksstuecke. Lernenden-Prüfer nur über die inhaltlich geänderten Seiten: siehe unten.

- **Lernenden-Prüfer zum Durchgang (Seiten haus, konstruktion, kongruenz, beide Recaps):** Heading, Sichtbares, Vorgang, kein `links:`: bestätigt, Rest behoben (Seiten- und Winkelbeschriftung a, b, c, α und B′ im Zweitdreieck, S/W und SsW vor Gebrauch erklärt, Hinweistext des Vierecks, „von A aus“, SSA-Rückmeldung). Nicht geändert, mit Grund: „Nachlesen“-Knöpfe der offenen Aufgabe (kommen aus `source:`, sind Verweise auf die eigene Seite, keine `links:`); Kartenlinks unter den Kurztests (Abschnitt 7 Punkt 3 verlangt sie); Überschrift der Recaps „Das brauchst du hier“ (Abschnitt 7 Punkt 4); erste Aufgaben bleiben leicht (Regel 3.1: ohne Vorwissen lösbar); die Kurztests der Recaps bleiben Wiederholungsniveau. Nicht prüfbar von hier: allgemeine Rückmeldung „Lies dazu noch einmal den Text“ (Laufzeit).

**Runde nach dem Review des Menschen (app-templates 0.19.0, tooling 0.18.6):** (1) `lernapps update` als eigener Commit (zwei Commits: der Hook scheiterte an `.claude/skills`, weil die Update-Version die kopierten Skill-Ordner durch Symlinks ersetzt und `git stash` „beyond a symbolic link“ meldet; ich habe die Symlinks kurz zur Seite gelegt, die Löschungen committet und die Symlinks danach als zweiten Commit hinzugefügt, kein `--no-verify`). Fund: der Hook von `lernapps update` kollidiert mit dem Wechsel Ordner → Symlink. (2) check/Build/Tests grün. (3) Umgesetzt: (a) Recaps: `Kurztest` gelöscht, je Recap genau zwei normale Übungen (Abschnitt „Kannst du das?“, mit Kartenlinks), Begriffe bleiben als Glossar-Einträge. (b) Erst das Wozu: je Seite ein Satz „Wenn du … willst, …“ zu Beginn der Abschnitte (Recap-Abschnitte, entdecken, warum, Merke, Übung, Begründung u. a.). (c) Buttons: fünf Zugmodus-Komponenten haben je einen Zurück-Button; er ist jetzt gestaltet wie die zweite Schaltfläche der Laufzeit (Rahmen, Akzentfarbe, Fokusrahmen), am Start deaktiviert mit sichtbarem Hinweis „Die Figur steht am Start.“; Dreiecksstuecke hat keinen Button. Geänderte Seiten: alle 10 (7 Inhaltsseiten, 3 Recaps), Komponenten: 5 geändert, 1 gelöscht (`Kurztest`).

- **Lernenden-Prüfer zu dieser Runde (Recaps, Anlass-Sätze, Buttons; alle 10 Seiten):** Recaps beurteilbar, Rückmeldungen nennen den Fehler; Buttons alle neun gestaltet und am Start deaktiviert mit Hinweis, Wirkung sichtbar. Behoben: Tastaturfokus fiel nach „Zurück“ auf den Seitenkörper (Fokus geht jetzt auf den Punkt, neue Datei `Fokus.ts` mit Test), Griffe zu klein auf 360 px (Radius größer), Standardsätze „Vermutung/Merke/Übung“ unpassend (neu gefasst), Anlass-Satz im Abschnitt Winkelsumme, Begriff „Kongruent“ fehlte (jetzt als Definition), Höhen-Anzeige „0 · 0 · 0 cm“ nutzlos (ersetzt). Nicht geändert, mit Grund: die Recaps haben vier bis fünf Bildschirme Begriffe vor der ersten Übung (Abschnitt 7 verlangt je Baustein Begriffe mit Beispiel; die zwei Übungen stehen gebündelt am Ende). Laufzeit, nicht von dieser App behebbar (an den Orchestrator): „Neue Aufgabe“ ist ein winziger, unstyled Textknopf; Lizenzzeile „Quelle: eigene Zeichnung. Lizenz: CC0-1.0“ liegt auf Bildbeschriftung B (360 px); Rückmeldung klebt Aussage und Grund als „…entfernt.: …“ zusammen; Recap-Kartenlinks zeigen rohe Kennungen („mathematik/winkel-messen“); „Aufgabe Nr. 39“ zufällig; Rückmeldung „Lies dazu noch einmal den Text über der Aufgabe“ ohne Bezug. Nicht erneut geprüft: die letzten Textänderungen nach diesem Lauf.

**Retro (Fakten):** Phasen: Explore, Plan, Code erreicht; Checkpoints Recherche, Plan, Musterseite vom Orchestrator beantwortet. Ein Blocker am Anfang (npx init abgelehnt, nach Freigabe gelöst). Rückfragen nach dem Plan: 0 an den Orchestrator außer dem Musterseiten-Checkpoint. Geraten: nur Deutsch, Story (Chat zweier erfundener Jugendlicher), Zugmodus als eigene Komponenten je Seite (6), Selbsteinschätzung in allen drei Kapiteln, `open-task` für die Begründung (daher `scope` überall), Reihenfolge der Kapitel-Seiten.

## Explore

<!--
- Find out what the app teaches, for whom, how much and how it looks. Ask; write no code, run no `create`.
- An answer counts only in the creator's words under "Answers". At most 2 questions per message, one topic each.
-->

### Tasks

- [x] Check the start: the folder `.agents/skills/lernapps-app` exists (else stop and tell the creator that the folder
      was not started with `init`), and `git branch --show-current` prints `work` (else `git switch -c work`).
- [x] Load skill `lernapps-app`. Tell the creator in two sentences what a lernapps app is and where it will live: at
      their own address, free and public, and once listed as a copy on lernapps.net. Say that the technical part
      (GitHub) comes at the end and that you do it.
- [x] Interview: ask the topics "Goal" and "Learners" of "Answers".
- [x] Load skill `lernapps-map-assignment` and read the learning map of the subject as it says. The creator brings
      the content themselves (material, a word list, the pages): note under "Notes" which competencies of the map it
      covers. Else write the skill's assignment, with its story; the creator's yes answers the topics Content and
      Amount. A subject without a map: skip this task and say so.
- [x] Load skill `lernapps-exercise-patterns` and read its reference for the subject. Note under "Notes" how learners
      will practise what the goal names.
- [x] Choose the archetype as skill `lernapps-app` says: read the README of each archetype in question, then tell the
      creator in plain words what the chosen one can and cannot do. Write the archetype and its reason under "Key
      decisions".
- [x] Run `npx --no -- lernapps skills --archetype <name>` with the chosen archetype. It installs the archetype's
      skills and adds the archetype's tasks to this plan.
- [x] Load skill `lernapps-explainer-design`. An explainer has the look of the runtime: write "fixed by the
      archetype" under the topic "Look and feel" of "Answers".
- [x] Interview: ask every other topic of "Answers", in order. Leave out only a topic that an answer of the creator
      already covers, and note which answer. A topic nobody answered is asked once before you write an assumption
      with "(guess)".
- [x] Load skill `lernapps-content-research` and research as it says. Write under "Notes": the strand or subject, the
      competencies by chapter with their ids, the sources you opened.
- [x] Write under "Notes" which competency goes on which page and which pages form a chapter, as "Map the content" of
      skill `lernapps-explainer-design` says. Per page, name the prerequisites the app does not practise.
- [x] Write under "Notes", one line per competency: how learners get there (they derive it, they do not only read it
      off), and which misconception the feedback catches.
- [x] Write under "Notes" the scope: what is in, what is out and why, the data range (for example "all main-group
      elements", never a silent "1–20"), the languages.
- [x] **Checkpoint:** research. Show in plain words: the strand or why none, the competencies by chapter, the didactic
      approach, the scope, every "(guess)", the sources and what is unchecked, the archetype and its reason. Stop and
      wait. Changes: change them, then ask again.
      Creator: Recherche freigegeben (Orchestrator in Vertretung)

### Answers

<!-- The interview: per topic the creator's answer, in their words. Keep the topics. -->

- Goal: (Issue #430, Orchestrator) Zugmodus tragen: ziehen, beobachten, vermuten, begründen; jedes Kapitel endet mit einer Begründung in eigenen Worten.
- Learners: (Issue #430) Stufe 7-8, Vorwissen aus 5-6 (Grundfiguren, Winkel messen, Symmetrie, Zeichnen, Abbilden).
- Model and focus: kein Vorbild-Explainer; Schwerpunkt Visualisierung (Zugmodus) und Begründen (Issue).
- Hurdles: s. Notes (Fehlvorstellungen je Baustein).
- Content: ich schreibe, aus eigenen Herleitungen und der Karte; kein Material von außen (Regel 4).
- Amount: alle 7 Bausteine, 3 Kapitel, je Baustein mind. 3 Aufgaben (Regel 3.1).
- Languages: nur Deutsch (guess: Issue nennt keine zweite Sprache).
- Look and feel: fixed by the archetype.
- Terms: Wörter der Karte; Schreibweisen nach regeln.md Abschnitt 2.
- Finding the app: (guess) Suchbegriffe: Satz des Thales, Winkelsumme Dreieck, Kongruenzsätze, Haus der Vierecke, Mittelsenkrechte, Klasse 7 Geometrie.

- Goal: what learners do in the app, what they learn.
- Learners: subject, school year, prior knowledge.
- Model and focus: an app of the catalog (https://lernapps.net/apps/llms.txt) as model; what matters most (exercises,
  visualisations, game feel).
- Hurdles: misconceptions and mistakes of the learners; the creator's examples and experiments.
- Content: who writes it (creator, you, from sources); own material (worksheets, tests).
- Amount: how much content in the first version; what comes later.
- Languages: German only, or German and English. Never English only.
- Look and feel: calm like a worksheet, or like a game (colours, praise, effects); dark mode.
- Terms: the creator's words for the main things in the app, used everywhere.
- Finding the app: what teachers and parents would search for.

## Plan

<!--
- Map the confirmed content onto the archetype. No new content questions: a gap in the content goes back to Explore.
- The creator confirms the plan in one read. After the yes you work on your own.
-->

### Tasks

- [x] Map the content as "Map the content" of skill `lernapps-explainer-design` says, and write the result under
      "Content method".
- [x] Choose a pattern per competency as skill `lernapps-exercise-patterns` says, and add it to "Content method".
- [x] Add to "Content method" one line per page, as "Engagement" of skill `lernapps-explainer-design` says: the
      opening task, the change of activity, the reward, the story.
- [x] Add the tasks of Code, each one a piece of work that ends in a commit. First the pattern: one complete page or
      screen, `npx --no -- lernapps plan add --at pattern "<task>"`. Then the others, one call each:
      `npx --no -- lernapps plan add --at pages "<task>"`. Each task says what it builds and what it shows.
- [x] Draw a sketch of each screen, component or interactive exercise: a static SVG or image, or the steps with what
      learners see after each. Keep the files in `.vibe/sketches/`.
- [x] Show the creator, short: goal, competencies by chapter, the Code tasks, the sketches, and the content method in
      plain words (what learners see and do, what the app cannot do). At most 2 questions.
- [x] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.
      Creator: Plan bestätigt (Orchestrator in Vertretung)

### Content method

<!-- One line each: the patterns and where; the figures and how they are made; the data files; each component, what it
checks and what it cannot; how a later agent adds a chapter. It becomes the content guide in Code. -->
<!-- An explainer: per figure, model and component its learning action in two to four sentences
(`explainer-representation-explained`); per page its prerequisites the app does not practise, and which get a recap
page, which a link. -->

**Gemeinsamer Zyklus jeder Satz-Seite** (Abschnittsids überall gleich): `einstieg` (Ziel in einem Satz, erste leichte Aufgabe) · `entdecken` (Zugmodus) · `vermutung` (Aufgabe: was bleibt gleich?) · `warum` (Beweis aus bekannten Bausteinen) · `merke` · `uebung` (≥ 4 Aufgaben, steigend) · `begruendung` (freie Begründung in eigenen Worten, Selbstvergleich mit Musterbegründung; die App prüft sie nicht). Kapitel enden mit einem Rückblick.
**Zugmodus** = Vue-Komponente `Zugmodus` (Grund: kein Block zeigt eine ziehbare Figur; `prefer-built-in-block`). Je Seite eine Figur-Konfiguration (Punkte, Messgrößen). Pflicht: (1) per Tastatur: Punkt fokussierbar, Pfeiltasten bewegen ihn, Tab wechselt den Punkt; (2) statische Form zuerst (`nojs`): SVG mit drei Stellungen nebeneinander und der Zahlenreihe; (3) Textalternative: sagt, was gleich bleibt (z. B. „Der Winkel bei C bleibt 90°.“) und in `aria-live` die aktuelle Messung; (4) Farbe nie allein (Beschriftung am Winkel); (5) Kontrast AA, 360 px. Er zeigt vor dem Ziehen die Aufgabe, nicht die Antwort (`explainer-figure-hides-answer`): die Messwerte erscheinen, die Aussage „bleibt gleich“ formuliert erst die Lernende in der Vermutung.
**Konstruktion**: Zirkel/Geodreieck werden nicht geprüft. Offen gesagt: Konstruieren üben die Lernenden über (a) `ordering` der Konstruktionsschritte, (b) Komponente `Konstruktion`: Schritte am Bildschirm (Zirkelkreis um Punkt mit Radius, Gerade durch zwei Punkte), Prüfung am Ergebnis. Was fehlt: freies Zeichnen auf Papier.
**Aufgabenmuster** (je Baustein ≥ 3 Aufgaben, die erste ohne Vorwissen lösbar):
- true-false mit Begründung in der Rückmeldung (Haus der Vierecke: „Jedes Quadrat ist ein Rechteck“); matching (Viereck ↔ Eigenschaften); ordering (Beweisschritte, nur feste Reihenfolge); single-choice „Was folgt?“ mit begründeten Falschoptionen; `generated` Winkel berechnen (Winkelsatz, Winkelsumme, Thales: α aus β, Seed, Mistakes: Nebenwinkel statt Scheitelwinkel, 90° statt 180° Summe); `generated` Eindeutigkeit (Stücke gegeben, 0/1/2 Lösungen); multiple-choice Kongruenzsatz „SSS, SWS, WSW, SsW, keiner“ mit „SSA“ und „WWW“ als typische Fehler; Komponente Zugmodus-Aufgabe (ziehe den Punkt so, dass …).
- Datendatei: `src/data/viereck-eigenschaften.yaml` (Viereck × Eigenschaft, einmal je Fakt; für Zuordnen/Haus). Sonst keine Daten.
**Je Seite (Eröffnung · Wechsel · Belohnung · Story)**:
- Alle Seiten: Story (Klasse 7-8): kurze Chat-Nachrichten zweier erfundener Jugendlicher, die im Schulgarten/Gestalten-Projekt etwas abstecken; nur wo sie etwas zeigt; Namen gemischt, keine Marken. Auf jeder Seite ein Auftrag aus dem Projekt, am Ende der nächste Schritt (guess: Story leicht, da Sätze der Geometrie im Zentrum stehen).
- haus-der-vierecke: Eröffnung: Viereck ziehen, bis vier gleich lange Seiten; Wechsel: ziehen → zuordnen → begründen; Belohnung: eigenes Haus gebaut (Pfeile „ist ein“).
- winkelsaetze: Eröffnung: Wechselwinkel ablesen; ziehen an Parallelen; Belohnung: Winkelsumme 180° begründet.
- kreis-sehne-tangente: Eröffnung: Gerade ziehen, Schnittpunkte zählen; Tangente senkrecht zum Radius.
- satz-des-thales (MUSTERSEITE): Eröffnung: Punkt C auf dem Halbkreis ziehen, Winkel bei C ablesen (leicht: C bei A fast); dann Vermutung, Warum (Radius-Dreiecke, Winkelsumme), Begründung.
- dreieckskonstruktion: Eröffnung: drei Stücke vorgeben, Dreieck entsteht; Schritte sortieren; Eindeutigkeit.
- kongruenz: Eröffnung: Stücke fest, Dreieck ziehen; Satz wählen; SSA-Gegenbeispiel.
- linien-im-dreieck: Eröffnung: Ecke ziehen, Schnittpunkt bleibt; Treffpunkt dreier Orte, größter Kreis.
**Musterseite: Satz des Thales.** Grund: Er hat den vollen Zyklus (entdecken → Vermutung → Warum → Begründung) und braucht beides: Zugmodus und Beweis mit Bausteinen von Seite 2 und 3 (Winkelsumme, gleichschenklig); Winkelsätze wäre einfacher, zeigt aber die Begründung kürzer. Thales ist tragender für die Sätze der Seiten danach. Voraussetzungen aus Winkelsätzen/Tangente werden für die Musterseite in der Sammel-Wiederholung angesprochen (guess: die Musterseite steht später an ihrer Stelle in Kapitel 2).
**Tutor**: nichts Besonderes. Selbsteinschätzung: nicht geplant (guess).
**Schreibweisen**: Winkel `90°` (geschütztes Leerzeichen nicht nötig bei °), Längen `3 cm`, Minus `−`, Winkel als *α*, Punkte *A*, *B*, *C*; Brüche gesetzt (kaum nötig).
**Wie ein späterer Agent ein Kapitel ergänzt**: Zugmodus-Konfiguration je Seite, Zyklus, Aufgabenmuster, Datendatei, Ids im Content-Guide.


## Code

<!--
- Build the app, locally on `work`, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first, then change every place it holds for
  (`feedback-applied-everywhere`).
-->

### Tasks

- [x] Load skill `lernapps-cli`. Create the app as its section "Create" says:
      `npx --no -- lernapps create --archetype explainer`.
- [x] Fill the content guide `.agents/skills/app-content/SKILL.md` from "Notes" and "Content method": every heading,
      no "FILL IN" left. Commit it before any content.
- [x] Load skill `lernapps-explainer`.
- [x] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [x] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
- [x] Musterseite Satz des Thales (Kapitel 2) mit Komponente Zugmodus (Tastatur, nojs-Form, Textalternative), Zyklus entdecken→Vermutung→Warum→Begründung, ≥4 Aufgaben mit Rückmeldung; Recap-Seite K2 als Stub
<!-- tasks: pattern (1 added): the one page or screen that is the pattern for the others -->
- [x] **Checkpoint:** the pattern page. Load skill `lernapps-learner-check` and do its learner check on the page. Fix
      what it finds. Then show the creator the page and ask whether the others may follow it. Stop and wait. A
      change: change the pattern first.
      Creator: Musterseite angenommen (Orchestrator in Vertretung)
- [x] Kapitel 1: Recap und Seite Haus der Vierecke (Datei viereck-eigenschaften, Zuordnen, Wahr/Falsch mit Begründung), Kapitelrückblick
- [x] Kapitel 2: Recap, Seiten Winkelsätze und Sehne/Sekante/Tangente (generated Winkelaufgaben mit Mistakes), Rückblick
- [x] Kapitel 3: Recap, Seite Dreieckskonstruktion mit Komponente Konstruktion und Eindeutigkeit
- [x] Kapitel 3: Seiten Kongruenz (Kongruenzsätze, SSA/WWW-Gegenbeispiel) und Besondere Linien im Dreieck (Um-/Inkreis), Rückblick
- [x] Startseite, Baustein→Seite-Liste im Content-Guide, Medienübersicht, Katalogtext-Entwurf
<!-- tasks: pages (5 added): the other pages or screens, after the pattern -->
- [x] Update the content guide so that it describes the app as built (`app-content-matches`).
- [x] Run `npx --no -- lernapps check` until it passes.
- [x] Look at every screen and state, at 360 px and on a desktop, as "Look at the app" of skill `lernapps-cli` says.
      Compare each with its sketch.
- [x] Do the whole-app check of skill `lernapps-learner-check`. Fix what it finds and write under "Notes" what you
      fixed.

## Commit

<!--
- Put the app on GitHub, publish it with the creator's yes, then list it. A push to `main` publishes.
- Open the pull requests (to `main`, to the catalog) without asking: they publish nothing.
- The creator asked to stop before publishing (a trial): stop here and say so.
-->

### Tasks

- [x] Load skill `lernapps-explainer-self-assessment`. Add the self-assessment as it says, or write under "Key
      decisions" why the app has none. Commit.
- [ ] Load skill `lernapps-github`. Set up the repository and Pages as it says. Ask for the repository's name and
      every click only the creator can make, in one message.
- [ ] Push `work`, open the preview pull request and see its checks to green, as skill `lernapps-github` says.
- [ ] **Checkpoint:** publish. Show what the app does and the preview link from the comment "Vorschau der App". Ask
      whether it may go online. Stop and wait for the yes.
- [ ] Load skill `lernapps-commit`. Publish as skill `lernapps-github` says: `work` into `main` as one squash commit,
      the run of `Pages` watched to its end.
- [ ] Open the address the job `deploy` printed and confirm that the app shows. Never use a derived address.
- [ ] Load skill `lernapps-listing`. Write the entry under "Entry draft" as it says, with the creator's answer to
      "Finding the app".
- [ ] Fill the retrospective.
- [ ] Commit this plan on `main` and push it: the listing check and the review read it there.
- [ ] **Checkpoint:** list. Open the listing pull request as skill `lernapps-listing` says, without asking first: the
      pull request is the review. See it to "bestanden", then show the creator the pull request and its result.
- [ ] If the plan changed since its last push, commit it on `main` and push again.

### Entry draft

<!-- YAML valid against the entry schema the listing skill names. Only known values, never invented. -->

```yaml
```

## Retrospective

<!-- At the end of Commit, before the listing pull request. Facts, short, no names. Read by review and evals. -->

### Phases reached

<!-- Last phase completed, checkpoints passed. E.g. "commit; confirmed, published". -->

### Creator turns after the plan

<!-- Number of creator messages after the confirmation, topic of each. Target: at most 3. -->

### Where I had to guess

<!-- Each gap in plan, skills, messages or answers, and your choice. "None" if none. -->
