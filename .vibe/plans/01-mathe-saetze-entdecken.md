---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, null until chosen in Explore. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: plan
# prePushFailures: failed pre-push runs, written by the hook.
prePushFailures: 0
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: {}
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
- [ ] Add the tasks of Code, each one a piece of work that ends in a commit. First the pattern: one complete page or
      screen, `npx --no -- lernapps plan add --at pattern "<task>"`. Then the others, one call each:
      `npx --no -- lernapps plan add --at pages "<task>"`. Each task says what it builds and what it shows.
- [ ] Draw a sketch of each screen, component or interactive exercise: a static SVG or image, or the steps with what
      learners see after each. Keep the files in `.vibe/sketches/`.
- [ ] Show the creator, short: goal, competencies by chapter, the Code tasks, the sketches, and the content method in
      plain words (what learners see and do, what the app cannot do). At most 2 questions.
- [ ] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.

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

- [ ] Load skill `lernapps-cli`. Create the app as its section "Create" says:
      `npx --no -- lernapps create --archetype explainer`.
- [ ] Fill the content guide `.agents/skills/app-content/SKILL.md` from "Notes" and "Content method": every heading,
      no "FILL IN" left. Commit it before any content.
- [ ] Load skill `lernapps-explainer`.
- [ ] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [ ] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
- [ ] Musterseite Satz des Thales (Kapitel 2) mit Komponente Zugmodus (Tastatur, nojs-Form, Textalternative), Zyklus entdecken→Vermutung→Warum→Begründung, ≥4 Aufgaben mit Rückmeldung; Recap-Seite K2 als Stub
<!-- tasks: pattern (1 added): the one page or screen that is the pattern for the others -->
- [ ] **Checkpoint:** the pattern page. Load skill `lernapps-learner-check` and do its learner check on the page. Fix
      what it finds. Then show the creator the page and ask whether the others may follow it. Stop and wait. A
      change: change the pattern first.
- [ ] Kapitel 1: Recap und Seite Haus der Vierecke (Datei viereck-eigenschaften, Zuordnen, Wahr/Falsch mit Begründung), Kapitelrückblick
- [ ] Kapitel 2: Recap, Seiten Winkelsätze und Sehne/Sekante/Tangente (generated Winkelaufgaben mit Mistakes), Rückblick
- [ ] Kapitel 3: Recap, Seite Dreieckskonstruktion mit Komponente Konstruktion und Eindeutigkeit
- [ ] Kapitel 3: Seiten Kongruenz (Kongruenzsätze, SSA/WWW-Gegenbeispiel) und Besondere Linien im Dreieck (Um-/Inkreis), Rückblick
- [ ] Startseite, Baustein→Seite-Liste im Content-Guide, Medienübersicht, Katalogtext-Entwurf
<!-- tasks: pages (5 added): the other pages or screens, after the pattern -->
- [ ] Update the content guide so that it describes the app as built (`app-content-matches`).
- [ ] Run `npx --no -- lernapps check` until it passes.
- [ ] Look at every screen and state, at 360 px and on a desktop, as "Look at the app" of skill `lernapps-cli` says.
      Compare each with its sketch.
- [ ] Do the whole-app check of skill `lernapps-learner-check`. Fix what it finds and write under "Notes" what you
      fixed.

## Commit

<!--
- Put the app on GitHub, publish it with the creator's yes, then list it. A push to `main` publishes.
- Open the pull requests (to `main`, to the catalog) without asking: they publish nothing.
- The creator asked to stop before publishing (a trial): stop here and say so.
-->

### Tasks

- [ ] Load skill `lernapps-explainer-self-assessment`. Add the self-assessment as it says, or write under "Key
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
