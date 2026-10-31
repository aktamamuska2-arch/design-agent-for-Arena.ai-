# Component references

Twelve JSX modules in [components/](components/). Each one is a working design, not a library: no
imports, no exports, no dependencies, no network calls, styles inline. They exist so a layout
decision can be seen rather than imagined.

**There is no React in the render path.** `html2png`, `html2pdf` and HyperFrames load plain HTML in
a browser. A module is therefore read and translated, never mounted. What transfers is the
composition — the section rhythm, the type scale, the spacing, the state handling in a dashboard or
a data table. What does not transfer is the palette: every module carries its own defaults.

## Which module answers which shape

| Module | Provides | Reach for it when |
| --- | --- | --- |
| [heroes.jsx](components/heroes.jsx) | HeroCenteredCTA, HeroLeftAlignedImage, HeroSplitScreen, HeroVideoBg, HeroMinimalTypography | an above-the-fold decision: centred, split, left-aligned or type-only |
| [landing-page.jsx](components/landing-page.jsx) | LandingEditorial, LandingProductTech, LandingMinimalStartup | a full marketing page with a section ladder |
| [pricing.jsx](components/pricing.jsx) | Pricing3TierCards, PricingTableComparison, PricingFreemiumToggle | a tier grid, a feature matrix, or a monthly/annual toggle |
| [dashboard.jsx](components/dashboard.jsx) | DashboardOpsDark, DashboardAnalyticsLight, DashboardFinanceLedger, Sparkline | a console: KPI strip, primary chart, ledger, activity |
| [data-table.jsx](components/data-table.jsx) | DataTable | sortable, filterable, paginated, multi-select rows |
| [chart-svg.jsx](components/chart-svg.jsx) | LineChart, BarChart, DonutChart, Sparkline | a chart drawn as inline SVG inside a prototype |
| [calendar.jsx](components/calendar.jsx) | Calendar | a month view with events, paging and a detail panel |
| [chat-ui.jsx](components/chat-ui.jsx) | ChatBubble, ThinkingDots, StreamingBubble, ToolCallCard, ChatUI | a conversation surface, including tool-call and streaming states |
| [glassmorphism.jsx](components/glassmorphism.jsx) | GlassCard, GlassNowPlaying, GlassSettings | one frosted panel — not a whole interface |
| [editorial-typography.jsx](components/editorial-typography.jsx) | EssayClassical, MagazineSpread, PoetryMinimal | long-form set as an essay or a magazine spread |
| [footers.jsx](components/footers.jsx) | FooterMega, FooterMinimal, FooterLinkGrid, FooterBrandNewsletter | closing a page's narrative |
| [slide-deck.jsx](components/slide-deck.jsx) | SlideTitle, SlideSection, SlideTwoCol, SlideStat | single-slide art direction; deck assembly is `slideshow` |

## Translating one

1. **Strip the defaults.** Each module opens with a `TWEAK_DEFAULTS` block of hex values
   (`#0f0f0f`, `#6366f1`, `#a1a1aa`) and hard-coded families (`Plus Jakarta Sans`, `DM Sans`,
   `JetBrains Mono`). None of them come from the brand pack. Replace every one with the pack's
   `var(--brand-…)`; a surviving hex is a `brand-lint` failure, not a style choice.
2. **Write HTML and CSS, not JSX.** Attributes become `class`, `style` objects become rules, and
   `.map()` becomes repeated markup. State becomes a small amount of plain JavaScript, or is dropped
   when the output is a still.
3. **Keep the structure, re-decide the expression.** The section order, the spacing rhythm and the
   hierarchy are the value. Colours, radii, shadows and type sizes are the pack's to decide.
4. **Check charts against `data-viz`.** `chart-svg.jsx` is fine for a sparkline or a prototype
   panel. If the chart carries a real claim, the spec and the dataset contract in `data-viz` own it.
5. **Run the gate.** `brand-lint` on the composition, then render and look at it before anyone else
   does.

## What these modules are not

Not a component library to ship, and not evidence that a module's own taste outranks the pack. When
a module's layout conflicts with the pack's graphic language, the pack wins and the layout is
recomposed — the same precedence stated in [conflicts.md](conflicts.md).
