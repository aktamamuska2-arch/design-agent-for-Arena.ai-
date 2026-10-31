---
name: ui-ux-design
description: >-
  Web and product UI craft for landing pages, dashboards, pricing pages, app screens and marketing
  sites built as HTML. Anti-slop taste rules, artifact-type density floors and interactive-depth
  minimums. The making stays with stills, data-viz and slideshow.
---

# UI/UX design

Web-shaped work: a page someone will scroll, a console someone will click, a screen with states.
This skill carries the craft — the taste rules, the density floors, the interaction minimums — and
the reference components. The making does not move: `stills` renders the file, `data-viz` owns any
chart or diagram, `slideshow` owns a deck.

Reach for it when the ask is a landing page, marketing site, pricing page, dashboard or admin
console, app screen, chat interface, case study, one-pager, report, email or web prototype. For a
chart on its own, a poster, a thumbnail or a film, the sibling skill already answers and this one
adds only its judgment.

## Who wins when the sources disagree

Two rule sets meet here, and only one order resolves them:

1. **The person's explicit ask** for this piece.
2. **A supplied reference's information**, for a restyle.
3. **The brand pack** at `/workspace/brand/` — tokens, fonts, voice, graphic language.
4. **This skill's craft defaults**, from the references below.

Brand shapes, colours and logos are never invented; a missing asset is asked for. Both
`instructions.md` and `brand-design` say this and this skill does not weaken it. Everything in
[references/anti-slop.v1.txt](references/anti-slop.v1.txt) is level 4 — taste that applies when the
pack is silent, never a veto over a pack that speaks. The working table of what changed, rule by
rule, is [references/conflicts.md](references/conflicts.md).

## Hard limits this skill cannot lift

- **No network at render time.** Upstream's allowances for the Tailwind CDN, Google Fonts and
  `cdnjs` do not hold in this sandbox. Fonts come from the brand pack and `fonts/`; script libraries
  are copied next to the composition or replaced with hand-written CSS and SVG. An `https://` asset
  in a composition is a broken deliverable, not a shortcut.
- **Every colour and face resolves through the pack.** `var(--brand-…)` custom properties, not raw
  hex and not a hard-coded family name. `brand-lint` fails colours outside the palette, off-brand
  stacks and radii over the pack's maximum.
- **The gates decide.** `brand-lint` on the composition, `artifact-contract` on the outputs, and
  your own eyes on every render before anyone else sees it. A gate that could not run (exit 2) is a
  tooling failure to report, never a pass.
- **Files land in the project, not in a ZIP.** `/workspace/projects/<slug>/` with `BRIEF.md`,
  compositions and `renders/`; delivery is `upload_files`. Upstream's "bundle a ZIP and save it to
  `~/`" is replaced by that contract.
- **Data is real or it is absent.** Charts route to `data-viz` and its dataset contract. Numbers in
  a prototype are marked as sample content and never dressed as measured fact.

## How the work runs

Seven steps, with the gates from this repository slotted in rather than bolted on:

1. **Understand** — parse the ask; expand a one-noun brief into a plausible product, audience and
   tone, and commit to it. Questions only when an answer changes the work, at most two.
2. **Classify** — one artifact type from
   [references/artifact-types.v1.txt](references/artifact-types.v1.txt); it sets the section floor.
3. **Explore** — hold the three directions from
   [references/design-methodology.v1.txt](references/design-methodology.v1.txt) internally. Exploring
   is not a proposal: the thread gets finished work, not a menu.
4. **Draft** — name the concept in one sentence and the section beats before any markup. `brand-design`'s
   concept gate and kill test still apply.
5. **Build** — HTML and CSS in the project folder, every value from the pack, one accent per frame.
   Start from [references/components.md](references/components.md) or a module in
   [references/components/](references/components/), adapted — never pasted with its own palette.
6. **Check** — the pre-flight list in [references/pre-flight.v1.txt](references/pre-flight.v1.txt),
   the interaction minimums in [references/craft-directives.v1.txt](references/craft-directives.v1.txt),
   then `brand-lint`, `artifact-contract` and a look at the render.
7. **Deliver** — `upload_files`, then one or two lines naming the calls you made. No ZIP, no
   narration, no claim of a file you did not upload.

## The craft payload

Read the file that the moment calls for; they are short and each owns one decision.

| File | Decides |
| --- | --- |
| [identity.v1.txt](references/identity.v1.txt) | the senior-designer stance and the quality bar |
| [workflow.v1.txt](references/workflow.v1.txt) | the seven steps, the revision pass, the done test |
| [design-methodology.v1.txt](references/design-methodology.v1.txt) | context before template; the three directions; token density |
| [anti-slop.v1.txt](references/anti-slop.v1.txt) | forbidden faces, the type ladder, colour and layout taste, the slop catalogue |
| [artifact-types.v1.txt](references/artifact-types.v1.txt) | the eight types, density floors, comparison and numeric rules |
| [craft-directives.v1.txt](references/craft-directives.v1.txt) | density floor, real copy, interaction minimums, craft surplus, multi-view rules |
| [pre-flight.v1.txt](references/pre-flight.v1.txt) | the eight silent answers before any markup |
| [output-rules.v1.txt](references/output-rules.v1.txt) | file shape, custom properties, structural and content rules |
| [chart-rendering.v1.txt](references/chart-rendering.v1.txt) | chart choice and mandatory chart elements |
| [safety.v1.txt](references/safety.v1.txt) | scope and the requests to decline |

The `.v1.txt` files are byte-identical to their upstream source. Where one of them contradicts a
rule above, the rule above wins and `conflicts.md` records the reason; do not edit them to fit.
[provenance/RETRIEVAL.md](provenance/RETRIEVAL.md) holds the hashes that prove it.

## Components

Twelve JSX modules — heroes, landing page, pricing, dashboard, data table, chart, calendar, chat,
glassmorphism, editorial typography, footers, slide deck — sit in
[references/components/](references/components/). They are **pattern references, not a runtime**:
there is no React in the render path. Read one for structure, rhythm and state handling, then write
the same thing as brand-tokenized HTML and CSS. [references/components.md](references/components.md)
says which module answers which shape and how to translate one safely.

## Done means

The type's section floor is met, every control does something and keyboard focus is visible, the
interaction minimums and at least three craft touches are present, the copy is specific to this
domain, `brand-lint` exits 0, and the render was looked at and fixed. A piece that lints clean and
still reads as generic marketing has failed; say so and fix it before it ships.
