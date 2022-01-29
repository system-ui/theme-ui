# v0.13.0 (Mon Dec 27 2021)

### Release Notes

#### Move Emotion and MDX packages to peerDeps ([#1867](https://github.com/system-ui/theme-ui/pull/1867))

**BREAKING CHANGE:** `@emotion/react` and `@mdx-js/react`  were moved to peerDependencies of `theme-ui`, `@theme-ui/mdx` and `@theme-ui/sidenav` and must be installed separately. This is a revert of change from Theme UI v0.3, and it's meant to help solve version clashes and context mismatch bugs on user side. Connected issues: [#1793](https://github.com/system-ui/theme-ui/issues/1793), [#1531](https://github.com/system-ui/theme-ui/issues/1531), [#1530](https://github.com/system-ui/theme-ui/issues/1530), [#1388](https://github.com/system-ui/theme-ui/issues/1388), [#1345](https://github.com/system-ui/theme-ui/issues/1345#issuecomment-742225675), [#1130](https://github.com/system-ui/theme-ui/issues/1130).

---

---

#### 🚀 Enhancement

- Move Emotion and MDX packages to peerDeps [#1867](https://github.com/system-ui/theme-ui/pull/1867) ([@hasparus](https://github.com/hasparus))

#### 🐛 Bug Fix

- fix(eslint): Add import/no-extraneous-dependencies and fix bad imports ([@hasparus](https://github.com/hasparus))

#### 👨‍💻 Minor changes

- Bump peerDependency in `gatsby-plugin-theme-ui` ([@hasparus](https://github.com/hasparus))

#### Authors: 1

- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))

---

# v0.12.0 (Thu Oct 28 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, William Pei ([@draekien](https://github.com/draekien)), for all your work!

#### 🚀 Enhancement


#### 🐛 Bug Fix

- Merge remote-tracking branch 'upstream/develop' into fix/color-scheme-media-query-api-update [#981](https://github.com/system-ui/theme-ui/pull/981) ([@draekien](https://github.com/draekien))

#### Authors: 6

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Julian Benegas ([@julianbenegas](https://github.com/julianbenegas))
- Lachlan Campbell ([@lachlanjc](https://github.com/lachlanjc))
- Lennart ([@LekoArts](https://github.com/LekoArts))
- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))
- William Pei ([@draekien](https://github.com/draekien))

---

# v0.8.3 (Wed May 05 2021)

#### ⚠️ Pushed to `stable`

- Merge branch 'stable' into develop ([@hasparus](https://github.com/hasparus))

#### Authors: 1

- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))

---

# v0.8.0 (Wed May 05 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Francis Champagne ([@fcisio](https://github.com/fcisio)), for all your work!

#### 🚀 Enhancement

- v0.8 [#1688](https://github.com/system-ui/theme-ui/pull/1688) ([@lachlanjc](https://github.com/lachlanjc) [@hasparus](https://github.com/hasparus))
- Refactor color objects and expose default colors as a mode [#1639](https://github.com/system-ui/theme-ui/pull/1639) ([@fcisio](https://github.com/fcisio))

#### 🐛 Bug Fix

- Merge remote-tracking branch 'origin/develop' into v0.8 ([@hasparus](https://github.com/hasparus))
- Merge branch 'stable' into config-2 ([@hasparus](https://github.com/hasparus))
- Merge branch 'config' into config-2 [#1421](https://github.com/system-ui/theme-ui/pull/1421) ([@hasparus](https://github.com/hasparus))
- fix: gatsby-plugin-theme-ui coverage ([@fcisio](https://github.com/fcisio))
- refactor: assemble the modes inside rawColors ([@fcisio](https://github.com/fcisio))
- fix: test coverage ([@fcisio](https://github.com/fcisio))
- Merge branch 'develop' into config ([@lachlanjc](https://github.com/lachlanjc))
- Fix remaining issues ([@lachlanjc](https://github.com/lachlanjc))
- Begin moving theme config options ([@lachlanjc](https://github.com/lachlanjc))

#### ⚠️ Pushed to `stable`

- Merge branch 'stable' into develop ([@hasparus](https://github.com/hasparus))

#### Authors: 4

- Brent Jackson ([@jxnblk](https://github.com/jxnblk))
- Francis Champagne ([@fcisio](https://github.com/fcisio))
- Lachlan Campbell ([@lachlanjc](https://github.com/lachlanjc))
- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))

---

# v0.7.1 (Mon Apr 19 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Jonathan Van Buren ([@vanbujm](https://github.com/vanbujm)), for all your work!

#### 🐛 Bug Fix

- fix(gatsby-plugin-theme-ui): Fast Refresh Compatibility [#1659](https://github.com/system-ui/theme-ui/pull/1659) ([@LekoArts](https://github.com/LekoArts) [@hasparus](https://github.com/hasparus))
- chore: update internal peerDependencies ([@hasparus](https://github.com/hasparus))

#### Authors: 5

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- [@dependabot[bot]](https://github.com/dependabot[bot])
- Jonathan Van Buren ([@vanbujm](https://github.com/vanbujm))
- Lennart ([@LekoArts](https://github.com/LekoArts))
- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))

---

# v0.7.0 (Thu Apr 15 2021)

#### 🚀 Enhancement

- WIP: Build packages with Preconstruct 2 [#1423](https://github.com/system-ui/theme-ui/pull/1423) ([@alexanderchan](https://github.com/alexanderchan) [@hasparus](https://github.com/hasparus))

#### 🐛 Bug Fix

- chore: More explicit Gatsby peer dep [#1640](https://github.com/system-ui/theme-ui/pull/1640) ([@LekoArts](https://github.com/LekoArts))
- Merge branch 'develop' into preconstruct-2 ([@hasparus](https://github.com/hasparus))
- Merge branch 'add/preconstruct' into preconstruct-2 ([@hasparus](https://github.com/hasparus))
- Run preconstruct fix to update main ([@alexanderchan](https://github.com/alexanderchan))

#### ⚠️ Pushed to `stable`

- Merge branch 'develop' into stable ([@hasparus](https://github.com/hasparus))

#### Authors: 3

- Alex Chan ([@alexanderchan](https://github.com/alexanderchan))
- Lennart ([@LekoArts](https://github.com/LekoArts))
- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))
