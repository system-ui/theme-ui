# v0.11.0 (Wed Aug 25 2021)

#### 🚀 Enhancement

- fix(color-modes): combine colors in nested providers [#1838](https://github.com/system-ui/theme-ui/pull/1838) ([@hasparus](https://github.com/hasparus))

#### 🐛 Bug Fix

- fix(color-modes): respect html.theme-ui-{mode} class in nested providers to reduce FOUC ([@hasparus](https://github.com/hasparus))
- 0.10 chores [#1842](https://github.com/system-ui/theme-ui/pull/1842) ([@hasparus](https://github.com/hasparus))
- fix(color-modes): properly combine colors from nested providers ([@hasparus](https://github.com/hasparus))
- fix(color-modes): nest styles using css not style ([@hasparus](https://github.com/hasparus))

#### Authors: 1

- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))

---

# v0.10.0 (Sat Jun 19 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Vlad Shcherbin ([@vladshcherbin](https://github.com/vladshcherbin)), for all your work!

### Release Notes

#### Allow easy styling autofilled of Inputs ([#1811](https://github.com/system-ui/theme-ui/pull/1811))

Background color of autofilled inputs will now default to `theme.colors.background`. It can be changed by setting `autofillBackgroundColor` prop.

---

#### 🚀 Enhancement


#### 🐛 Bug Fix

- Allow easy styling autofilled of Inputs [#1811](https://github.com/system-ui/theme-ui/pull/1811) ([@hasparus](https://github.com/hasparus))

#### 🏠 Internal

- Docs: update JSX pragma guide with automatic runtime section [#1718](https://github.com/system-ui/theme-ui/pull/1718) ([@flo-sch](https://github.com/flo-sch) [@hasparus](https://github.com/hasparus))
- docs: set <meta name='color-scheme' ([@hasparus](https://github.com/hasparus))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Florent SCHILDKNECHT ([@flo-sch](https://github.com/flo-sch))
- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))
- Vlad Shcherbin ([@vladshcherbin](https://github.com/vladshcherbin))

---

# v0.8.3 (Wed May 05 2021)

#### 🐛 Bug Fix

- fix(color-modes): stop showing current color mode as initial mode in rawColors.modes ([@hasparus](https://github.com/hasparus))

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
- feat(css): remove deprecated theme.useBodyStyles ([@hasparus](https://github.com/hasparus))
- feat: create the allColorModes object in the context ([@fcisio](https://github.com/fcisio))

#### 🐛 Bug Fix

- Merge remote-tracking branch 'origin/develop' into v0.8 ([@hasparus](https://github.com/hasparus))
- test: read root styles from html element ([@hasparus](https://github.com/hasparus))
- fix(color-modes): default useCustomProperties to true, as in the docs ([@hasparus](https://github.com/hasparus))
- Merge branch 'stable' into config-2 ([@hasparus](https://github.com/hasparus))
- Merge branch 'config' into config-2 [#1421](https://github.com/system-ui/theme-ui/pull/1421) ([@hasparus](https://github.com/hasparus))
- refactor: memoize theme colors mutation ([@fcisio](https://github.com/fcisio))
- refactor: remove lodash dependency ([@fcisio](https://github.com/fcisio))
- refactor: assemble the modes inside rawColors ([@fcisio](https://github.com/fcisio))
- fix: test coverage ([@fcisio](https://github.com/fcisio))
- Update color-modes to be more backwards compatible ([@lachlanjc](https://github.com/lachlanjc))
- Remove duplicate vars from merge conflict ([@lachlanjc](https://github.com/lachlanjc))
- Merge branch 'develop' into config ([@lachlanjc](https://github.com/lachlanjc))
- Fix remaining issues ([@lachlanjc](https://github.com/lachlanjc))
- Begin moving theme config options ([@lachlanjc](https://github.com/lachlanjc))
- Re-add config options to root theme type as deprecated ([@lachlanjc](https://github.com/lachlanjc))
- Make changes to ColorModeProvider non-breaking ([@lachlanjc](https://github.com/lachlanjc))

#### ⚠️ Pushed to `stable`

- Merge branch 'stable' into develop ([@hasparus](https://github.com/hasparus))

#### Authors: 4

- Brent Jackson ([@jxnblk](https://github.com/jxnblk))
- Francis Champagne ([@fcisio](https://github.com/fcisio))
- Lachlan Campbell ([@lachlanjc](https://github.com/lachlanjc))
- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))

---

# v0.7.5 (Wed Apr 28 2021)

#### ⚠️ Pushed to `stable`

- Merge branch 'develop' into stable ([@hasparus](https://github.com/hasparus))

#### Authors: 1

- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))

---

# v0.7.0 (Thu Apr 15 2021)

#### 🚀 Enhancement

- WIP: Build packages with Preconstruct 2 [#1423](https://github.com/system-ui/theme-ui/pull/1423) ([@alexanderchan](https://github.com/alexanderchan) [@hasparus](https://github.com/hasparus))

#### 🐛 Bug Fix

- Merge branch 'develop' into preconstruct-2 ([@hasparus](https://github.com/hasparus))
- test: fix test types ([@hasparus](https://github.com/hasparus))
- wip(workspace): update to preconstruct 2 ([@hasparus](https://github.com/hasparus))
- Merge branch 'add/preconstruct' into preconstruct-2 ([@hasparus](https://github.com/hasparus))
- Remove types reference since it comes from cjs.d.ts ([@alexanderchan](https://github.com/alexanderchan))
- Remove references to microbundle ([@alexanderchan](https://github.com/alexanderchan))
- Remove unused files ([@alexanderchan](https://github.com/alexanderchan))
- Run preconstruct fix to update main ([@alexanderchan](https://github.com/alexanderchan))

#### ⚠️ Pushed to `stable`

- Merge branch 'develop' into stable ([@hasparus](https://github.com/hasparus))

#### Authors: 2

- Alex Chan ([@alexanderchan](https://github.com/alexanderchan))
- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))
