---
schemaVersion: 1
name: open-codesign
description: >
  AI design agent that turns chat prompts into complete UI/UX file suites packaged as ZIP.
  User types a design request in chat → LLM generates production-quality HTML/CSS/JS files →
  files are bundled into a ZIP archive → saved to user-specified directory or ~/ by default.
  Generates landing pages, dashboards, pricing pages, slide decks, case studies, emails, one-pagers, reports.
  Encodes senior product designer craft: real hierarchy, considered color, meaningful whitespace, anti-slop guidelines.
  Includes 12 design skill reference modules (slide decks, dashboards, landing pages, SVG charts, glassmorphism,
  editorial typography, heroes, pricing, footers, chat UIs, data tables, calendars).
trigger:
  providers: ['*']
  scope: system
disable_model_invocation: false
user_invocable: true
---

# Open CoDesign — AI Design Agent Skill

## Usage Workflow

1. User types a design request in the chat window (e.g., "设计一个SaaS产品的落地页")
2. The LLM reads this skill's prompt files as system context
3. The LLM generates a complete set of UI/UX files (HTML, CSS, JS, assets)
4. The agent bundles all generated files into a ZIP archive
5. The ZIP is saved to the user-specified directory, or `~/` if not specified

## When to Use

Invoke when the user asks to:
- Design a landing page, dashboard, pricing page, or any visual UI
- Create a prototype from a text description
- Generate a complete UI/UX file suite
- Build slide decks, marketing assets, or email templates
- Create data visualizations or analytics dashboards
- Design mobile app mockups or responsive web interfaces

## Trigger Words

design, prototype, landing page, dashboard, pricing page, slide deck, UI mockup, HTML design, web design, marketing site, case study, email template, one-pager, report, data visualization, chart, 设计, 原型, 落地页, 仪表盘, 幻灯片, UI套件, 界面设计

## Output: ZIP File Suite

Every design request produces a ZIP archive containing:

```
design-name/
├── index.html          # Main entry point — self-contained HTML prototype
├── styles/
│   └── main.css        # CSS custom properties, layout, animations
├── scripts/
│   └── main.js         # Interactive behaviors (tabs, modals, toggles)
└── assets/
    └── (inline SVGs, data URIs — no external images)
```

### File Rules

- **index.html**: Self-contained, semantic HTML, mobile-first responsive
- **CSS**: All visual values as CSS custom properties on `:root`; use oklch color space
- **JS**: Vanilla JS or React (via CDN); no build step required
- **External resources**: Only Tailwind CDN, Google Fonts, cdnjs.cloudflare.com libraries
- **No hotlinked images**: All imagery as inline SVG or CSS gradients
- **Maximum 1000 lines** per HTML file

## Artifact Types

| Type | Min Sections | Required Beats |
|------|-------------|----------------|
| landing | 5 | hero · value props (3+) · social proof · feature deep-dive · CTA |
| case_study | 6 | hero · before/after · challenge · solution · pull quote · CTA |
| dashboard | 5 | top bar · KPI strip (4+) · primary chart · secondary table · activity panel |
| pricing | 4 | headline · tier grid (3 tiers) · FAQ · CTA |
| slide | 1 | one rectangle, one idea, 3+ type sizes |
| email | 5 | preheader · headline · body · CTA · footer |
| one_pager | 6 | hero · 3 supporting blocks · evidence · CTA |
| report | 7 | cover · TL;DR · 3 findings · methodology · conclusion |

## Design Rules (from prompts/)

All design intelligence is encoded in the `prompts/` directory. The LLM must follow:

- **identity.v1.txt** — Act as a senior product designer
- **workflow.v1.txt** — 7-step process: Understand → Classify → Explore → Draft → Implement → Self-check → Deliver
- **output-rules.v1.txt** — File constraints, CSS custom properties, structural rules
- **design-methodology.v1.txt** — Three directions: minimal, bold, corporate neutral
- **anti-slop.v1.txt** — Visual taste guidelines (forbidden fonts, color rules, layout principles)
- **artifact-types.v1.txt** — Type taxonomy and density floors
- **pre-flight.v1.txt** — 8-point internal checklist before generating
- **craft-directives.v1.txt** — Interactive depth, micro-interactions, craft surplus
- **safety.v1.txt** — Scope boundaries
- **chart-rendering.v1.txt** — Chart rendering contract for dashboards

## Design Skill References (from design-skills/)

12 JSX reference modules provide starter patterns the LLM can adapt:

| Module | When to Use |
|--------|-------------|
| slide-deck.jsx | Pitch decks, presentations |
| dashboard.jsx | Admin consoles, analytics views |
| landing-page.jsx | Landing pages, marketing sites |
| chart-svg.jsx | Data visualizations, charts |
| glassmorphism.jsx | Frosted glass, iOS-style UI |
| editorial-typography.jsx | Magazine layouts, essays |
| heroes.jsx | Hero sections, page headers |
| pricing.jsx | Pricing tables, plan comparisons |
| footers.jsx | Site footers |
| chat-ui.jsx | Chat interfaces, messaging |
| data-table.jsx | Admin tables, sortable lists |
| calendar.jsx | Month-view calendars |

## Key Design Principles

### Typography
- **Forbidden:** Inter, Roboto, Arial, Helvetica, Playfair Display
- **Preferred:** Fraunces, Syne, Geist, DM Serif Display, Instrument Serif, Space Grotesk
- **Type ladder (required):** display (48-96px) → h1 (28-40px) → body (16-18px) → caption (12-14px)

### Color
- Use oklch color space for accents
- No default Tailwind blue (#3b82f6)
- No pure black text
- Dark themes: ≥3 surface tones, gradient/glow, 2 accents minimum

### Layout
- Prefer asymmetry over symmetry
- Vary section heights
- Use negative space as a design element

### Content
- No lorem ipsum, no "John Doe", no hotlinked images
- Realistic, domain-specific copy
- Numbers that aren't suspiciously round

### Interactivity
- ≥3 functional state changes (tabs, accordions, modals, toggles)
- Hover + press feedback on every clickable element
- Focus states on all interactive elements
- ≥3 craft surplus touches (badges, tooltips, keyboard shortcuts, etc.)

## License

MIT — Free to fork, ship, or sell.

## Source

Adapted from [OpenCoworkAI/open-codesign](https://github.com/OpenCoworkAI/open-codesign)
