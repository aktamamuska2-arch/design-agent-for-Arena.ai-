# Retrieval record

Every file in this skill was pulled from Google Drive on 2026-10-31, not retyped. The hashes below
are what makes that checkable.

- **Drive folder:** `Arena AI > #4`
- **Folder id:** `1oTINHGgIpTpY8gsL56wWUS1eN15mKdbU`
- **Parent folder id:** `1sKJJ2FHyq_-M_xEs2E2E83k7dvQPPnf9`
- **Items in the folder:** 24, all retrieved; 24 vendored here
- **Transfer:** byte download per file; each file's size was verified against the Drive metadata,
  then `sha256` computed on the written copy
- **Upstream of the material:** `ui-ux-design`, an MIT-licensed agent skill adapted from
  [OpenCoworkAI/open-codesign](https://github.com/OpenCoworkAI/open-codesign). Licence text in
  [licenses/ui-ux-design-LICENSE.txt](../../../licenses/ui-ux-design-LICENSE.txt)

The folder held loose files, not an archive — no ZIP, no build artefacts, no dependencies.

## Note on the variant

The 12 `.jsx` modules here are a condensed variant of the upstream repository: they are smaller
than every revision of those files in `open-codesign`'s git history (for example `heroes.jsx` is
8,217 bytes here against 18,725 at upstream `main`), and they contain no imports or exports. They
are therefore vendored from Drive as the authoritative copy rather than substituted from GitHub.
The `.v1.txt` prompts likewise use a naming scheme (`*.v1.txt`) that upstream has since replaced
with `packages/core/src/prompts/sections/*.md`.

## Directives — `references/`

| File | Bytes | sha256 |
| --- | --- | --- |
| `anti-slop.v1.txt` | 6390 | `4d7f4999914263c017de212eb845849ac6302a6a2b418489336fde5ea8430a7c` |
| `artifact-types.v1.txt` | 5150 | `05103073a8e1bd0aa1c826f566d255606ba82a0df65819cd11a951a433a65df7` |
| `chart-rendering.v1.txt` | 3329 | `3bbebe7c61e52cc3bf90a1105f43257120e625d3365ab61de3f3df5f74a79c4b` |
| `craft-directives.v1.txt` | 16644 | `40d0323c2d99aba3b56a8b366caf3564be3bda1c296735ed4b99d792e9884874` |
| `design-methodology.v1.txt` | 2812 | `e60bafc587dd3fa5d75b0a1f8d5a5f96f2c6dcbce9a42ea436ad441d2d065d6a` |
| `identity.v1.txt` | 615 | `69f6091e93989852eb1e788acd8106a07df3aaf0ebf9b571eb111a2a3fab1fd9` |
| `output-rules.v1.txt` | 3069 | `8db7d900acb839da9d882d8acce60014c17e79293a07e530c3b0b1a6fe572409` |
| `pre-flight.v1.txt` | 1430 | `222223a30cc77105b6fe604b0859b9a562832a8f38be54240cbd49a63e7d4df0` |
| `safety.v1.txt` | 1823 | `fb3ca40267d963c2268bd5f2a1f2120b13d934fd9b8616abf8f7cd510dfb9392` |
| `workflow.v1.txt` | 1748 | `470e247c895438fb77e5148364fd16965a8fd62990d0430c5ae01e6de004cf4f` |

## Components — `references/components/`

| File | Bytes | sha256 |
| --- | --- | --- |
| `calendar.jsx` | 6798 | `929e6f1d43124763e1714a5316faa940746b9e93ce6c3d937250250bf6e5a68a` |
| `chart-svg.jsx` | 6521 | `815787732760015aec580eef4c94fd909d8340bada5af4499c714e07a523b7ab` |
| `chat-ui.jsx` | 6291 | `7380b5b535928d431e37cdbcee49c4cbc56a538934076f29014dce835db94567` |
| `dashboard.jsx` | 9809 | `82a01726a8643d50a8c76e701fb582de7e79c33ca90fe9f12fe5d440efe82da6` |
| `data-table.jsx` | 7641 | `eacae1b0251a55b39d048087d621fac5bcf277a6e5c5df0867797d19bb376fee` |
| `editorial-typography.jsx` | 7138 | `5b105ff9498fe69cffa7e23327013acd03c489fa0215978ed275f120ec85728d` |
| `footers.jsx` | 6765 | `0d83c5b88f5c8d0c6fc51bf154ab489b02447131a2f59fc940e9ced101df473c` |
| `glassmorphism.jsx` | 6849 | `b31e3ed60e0c54f4e212ad502d0e00599fa12df3863165ee9c68bbd3261f6ae0` |
| `heroes.jsx` | 8217 | `854b33e8e3c397a61f7b91b5a998596fe6cdccd9ac16bfba91f0e4ed9a0888e1` |
| `landing-page.jsx` | 11921 | `bc72fe6463c28f8bc361b4ba1fa78b8583ffa528518c6a795b4bab38ca2e258b` |
| `pricing.jsx` | 10318 | `36401ef8684bed025677c400ff06c1a7473b17d4f05f30d69fc3cfe8a2d46118` |
| `slide-deck.jsx` | 5896 | `4dd4b05d1a5815a0823daa29781854ef9a40f10bfcc53ad95d720d674bcdac6f` |

## Archived upstream documents — `provenance/`

Kept verbatim as the record of what was received, not as instructions. Both describe the standalone
ZIP workflow that [../references/conflicts.md](../references/conflicts.md) replaces.

| File | Original name | Bytes | sha256 |
| --- | --- | --- | --- |
| `upstream-skill-original.md` | `SKILL.md` | 6357 | `dfea74870ae3cec88e3800e01de9f00f6e140afa650c24fefe6dea9b945cdfc2` |
| `upstream-readme.md` | `README.md` | 32987 | `9cffe97c0a0327b52f1c9cd05f305ff84b8964a6a3b55c07147f75260639057a` |

The upstream `SKILL.md` was not adopted as this skill's `SKILL.md`: its frontmatter (`schemaVersion`,
`trigger`, `user_invocable`) is a different agent platform's schema, and its body routes to a ZIP
bundle. [../SKILL.md](../SKILL.md) is the adapted version, written against this repository's skill
contract.

## Verifying

From the repository root, on any later checkout:

```bash
cd skills/ui-ux-design && sha256sum references/*.v1.txt references/components/*.jsx provenance/*.md
```

A file whose digest has drifted from the table above has been edited. The directives are meant to
stay frozen; a new rule is reconciled in [../references/conflicts.md](../references/conflicts.md)
and stated in `SKILL.md` instead.
