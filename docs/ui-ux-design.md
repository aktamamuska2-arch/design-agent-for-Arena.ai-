# The `ui-ux-design` module

A judgment skill for web-shaped work: landing pages, marketing sites, pricing pages, dashboards,
admin consoles, app screens, chat surfaces, case studies, one-pagers, reports and emails. It carries
craft — taste rules, density floors, interaction minimums, pattern references — and hands the making
to the skills that already do it: `stills` renders the HTML, `data-viz` owns anything whose job is
numbers, `slideshow` owns a deck.

The skill itself is [skills/ui-ux-design/SKILL.md](../skills/ui-ux-design/SKILL.md). This page is
for whoever maintains the merge.

## What was retrieved, and from where

Everything came from Google Drive, folder **`Arena AI > #4`**, on 2026-10-31: 24 loose files, no
archive. All 24 are vendored. The record with per-file byte counts and `sha256` digests is
[skills/ui-ux-design/provenance/RETRIEVAL.md](../skills/ui-ux-design/provenance/RETRIEVAL.md); the
licence is MIT ([licenses/ui-ux-design-LICENSE.txt](../licenses/ui-ux-design-LICENSE.txt)),
attributed in [NOTICE.md](../NOTICE.md).

The material is a variant of the `ui-ux-design` agent skill, itself adapted from
[OpenCoworkAI/open-codesign](https://github.com/OpenCoworkAI/open-codesign). It is **not** the
current upstream tree: the JSX modules are condensed (no imports, no exports, smaller than any
revision in upstream git) and the prompts use a `*.v1.txt` naming scheme that upstream has since
replaced with `packages/core/src/prompts/sections/*.md`. The Drive copies are therefore
authoritative, and no file was substituted from GitHub.

## The merge map

| Drive item | Landed at | Treatment |
| --- | --- | --- |
| `identity`, `workflow`, `output-rules`, `design-methodology`, `anti-slop`, `artifact-types`, `pre-flight`, `craft-directives`, `safety`, `chart-rendering` (`.v1.txt`) | `skills/ui-ux-design/references/` | byte-identical, never edited |
| 12 `.jsx` modules | `skills/ui-ux-design/references/components/` | byte-identical; read as patterns, not mounted |
| `SKILL.md` | `skills/ui-ux-design/provenance/upstream-skill-original.md` | archived verbatim; its frontmatter is another platform's schema |
| `README.md` | `skills/ui-ux-design/provenance/upstream-readme.md` | archived verbatim, as documentation only |
| — | `skills/ui-ux-design/SKILL.md` | **new**, written against this repository's skill contract |
| — | `skills/ui-ux-design/references/conflicts.md` | **new**, the reconciliation register |
| — | `skills/ui-ux-design/references/components.md` | **new**, the module index and translation contract |

Two rules shaped the layout. `skills/<name>/` is discovered exactly one level deep, so nothing in
`references/` can be mistaken for a skill. And Context Hub takes only UTF-8 text, so a JSX or `.txt`
reference needs no `skill-binaries/` entry — but also nothing binary may be added here later without
one.

## The reconciliation, in one paragraph

`SKILL.md` fixes the precedence the rest of the repository already uses — person's ask, then a
supplied reference, then the brand pack, then craft defaults — which demotes every upstream taste
rule to the weakest layer. On top of that, five upstream behaviours were replaced outright: the CDN
and Google Fonts allowances (no network at render time), the ZIP-to-`~/` delivery (`upload_files`
from `/workspace`), the "self-contained file" reading (local stylesheets are fine, external hosts
are not), the persona ("You are open-codesign"), and the chart-rendering contract (a chart of
numbers belongs to `data-viz`, which refuses to misstate data). Density floors and the licence to
invent realistic copy were **scoped** to web artifacts, because `instructions.md` still says the
fewest words win on a graphic. [conflicts.md](../skills/ui-ux-design/references/conflicts.md)
carries all fourteen rulings with the upstream rule beside the rule it lands on.

## Build readiness

No new dependency, no build step, no lock entry.

- **No package changes.** The JSX modules import nothing and are not compiled; `pyproject.toml`,
  `uv.lock` and `package.json` files are untouched. There is no React in the render path.
- **No `skills-lock.json` entry.** The lock covers vendored upstream skills only. This one is ours,
  derived, and its provenance is the hash table instead — the same reason `brand-design` and
  `design-wiki` are not in the lock.
- **Text only.** Every file is UTF-8, so the Context Hub sync and `mda deploy` need no binary
  split, and the stager copies the tree to `/workspace/skills/ui-ux-design/` like any other skill.
- **Resident-prompt cost.** One skill line: the description is 252 characters, inside the 300-char
  budget that keeps the first model call under 8k tokens. The body is 7.0 KB, inside the 10 KB
  bound; detail lives in `references/`.

## Checks that must keep passing

```bash
uv run pytest tests/unit/test_media_skills.py tests/unit/test_taste_skills.py \
  tests/unit/test_docs_links.py tests/unit/test_public_hygiene.py \
  tests/contract/test_prompt_budget.py -q
```

`test_docs_links` resolves every relative link in this skill's Markdown, `test_public_hygiene` scans
it for private or licensed material, and `test_prompt_budget` measures the skill list in the first
model call. A new reference file must keep its links resolvable and stay UTF-8.

## Extending it

- **A new craft rule:** reconcile it in `references/conflicts.md` first, then state the verdict in
  `SKILL.md`. Do not edit a `.v1.txt` file — a drifted digest means the transplant claim is no
  longer true.
- **A new component:** drop it in `references/components/`, add it to the table in
  `references/components.md` with its shape and its `when_to_use`, and note that its palette
  defaults must be stripped.
- **A new upstream drop from Drive:** re-run the retrieval, update the hash table in
  `provenance/RETRIEVAL.md`, and diff the directives against the reconciliation register — a new
  rule is a new conflict to rule on, not a file to overwrite.
