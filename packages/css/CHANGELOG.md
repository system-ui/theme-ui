# v0.13.1 (Wed Jan 05 2022)

#### 🐛 Bug Fix

- css: Make background a theme-aware property [#2056](https://github.com/system-ui/theme-ui/pull/2056) ([@lachlanjc](https://github.com/lachlanjc))

#### 🏠 Internal

- css: Make background a theme-aware property ([@lachlanjc](https://github.com/lachlanjc))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Akash ([@appsparkler](https://github.com/appsparkler))
- Lachlan Campbell ([@lachlanjc](https://github.com/lachlanjc))
- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))

---

# v0.13.0 (Mon Dec 27 2021)

### Release Notes

#### Move Emotion and MDX packages to peerDeps ([#1867](https://github.com/system-ui/theme-ui/pull/1867))

**BREAKING CHANGE:** `@emotion/react` and `@mdx-js/react`  were moved to peerDependencies of `theme-ui`, `@theme-ui/mdx` and `@theme-ui/sidenav` and must be installed separately. This is a revert of change from Theme UI v0.3, and it's meant to help solve version clashes and context mismatch bugs on user side. Connected issues: [#1793](https://github.com/system-ui/theme-ui/issues/1793), [#1531](https://github.com/system-ui/theme-ui/issues/1531), [#1530](https://github.com/system-ui/theme-ui/issues/1530), [#1388](https://github.com/system-ui/theme-ui/issues/1388), [#1345](https://github.com/system-ui/theme-ui/issues/1345#issuecomment-742225675), [#1130](https://github.com/system-ui/theme-ui/issues/1130).

---

---

#### 🚀 Enhancement

- Move Emotion and MDX packages to peerDeps [#1867](https://github.com/system-ui/theme-ui/pull/1867) ([@hasparus](https://github.com/hasparus))
- feat(deps): move Emotion to peerDeps ([@hasparus](https://github.com/hasparus))

#### 🐛 Bug Fix

- fix(eslint): Add import/no-extraneous-dependencies and fix bad imports ([@hasparus](https://github.com/hasparus))

#### Authors: 1

- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))

---

# v0.12.0 (Thu Oct 28 2021)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: Julian Benegas ([@julianbenegas](https://github.com/julianbenegas))

:heart: William Pei ([@draekien](https://github.com/draekien))

#### 🚀 Enhancement

- Use media query value when useColorSchemeMediaQuery is set to 'system' [#1981](https://github.com/system-ui/theme-ui/pull/1981) ([@julianbenegas](https://github.com/julianbenegas) [@draekien](https://github.com/draekien))
- feat(usecolorschememediaquery): added 'system' and 'initial' as valid types ([@draekien](https://github.com/draekien))

#### 🐛 Bug Fix

- Update packages/css/src/options.ts ([@draekien](https://github.com/draekien))
- Merge remote-tracking branch 'upstream/develop' into fix/color-scheme-media-query-api-update [#981](https://github.com/system-ui/theme-ui/pull/981) ([@draekien](https://github.com/draekien))
- fix(css): reexport CSSObject from @emotion/react ([@hasparus](https://github.com/hasparus))

#### Authors: 6

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Julian Benegas ([@julianbenegas](https://github.com/julianbenegas))
- Lachlan Campbell ([@lachlanjc](https://github.com/lachlanjc))
- Lennart ([@LekoArts](https://github.com/LekoArts))
- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))
- William Pei ([@draekien](https://github.com/draekien))

---

# v0.11.0 (Wed Aug 25 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Torne Wuff ([@tornewuff](https://github.com/tornewuff)), for all your work!

### Release Notes

#### Add @theme-ui/css/utils with TypeScript CIF functions and fix preset types ([#1862](https://github.com/system-ui/theme-ui/pull/1862))

- Added TypeScript [Constrained identity functions](https://kentcdodds.com/blog/how-to-write-a-constrained-identity-function-in-typescript) `makeTheme`, `makeStyles` and `makeColorsScale` which can be imported from _@theme-ui/css/utils_.
- Used aformentioned functions to properly define types of presets. Exported themes are now assignable to _Theme_ but their types narrowly describe their exact values.

---

---

#### 🚀 Enhancement

- Add @theme-ui/css/utils with TypeScript CIF functions and fix preset types [#1862](https://github.com/system-ui/theme-ui/pull/1862) ([@tornewuff](https://github.com/tornewuff) [@hasparus](https://github.com/hasparus))
- feat(css): add makeTheme constrained identity function ([@hasparus](https://github.com/hasparus))

#### 🐛 Bug Fix

- add types for css prop back [#1866](https://github.com/system-ui/theme-ui/pull/1866) ([@hasparus](https://github.com/hasparus))
- fix(core): add `css` prop back to JSX types ([@hasparus](https://github.com/hasparus))

#### 🏠 Internal

- refactor(css): remove unused imports [#1877](https://github.com/system-ui/theme-ui/pull/1877) ([@hasparus](https://github.com/hasparus))
- docs(css): add usage examples for core packages [#1877](https://github.com/system-ui/theme-ui/pull/1877) ([@hasparus](https://github.com/hasparus))

#### Authors: 2

- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))
- Torne Wuff ([@tornewuff](https://github.com/tornewuff))

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
- fix(css): add JSDoc comment to sx.label [#1813](https://github.com/system-ui/theme-ui/pull/1813) ([@hasparus](https://github.com/hasparus))
- fix(css): add JSDoc comment to sx.label ([@hasparus](https://github.com/hasparus))
- Add missing meta repository to published packages [#1807](https://github.com/system-ui/theme-ui/pull/1807) ([@aaronadamsCA](https://github.com/aaronadamsCA))
- Add missing repository metadata to published packages [#1779](https://github.com/system-ui/theme-ui/pull/1779) ([@aaronadamsCA](https://github.com/aaronadamsCA))
- Add missing meta repository to published packages ([@aaronadamsCA](https://github.com/aaronadamsCA))

#### 🏠 Internal

- Docs: update JSX pragma guide with automatic runtime section [#1718](https://github.com/system-ui/theme-ui/pull/1718) ([@flo-sch](https://github.com/flo-sch) [@hasparus](https://github.com/hasparus))

#### Authors: 5

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Aaron Adams ([@aaronadamsCA](https://github.com/aaronadamsCA))
- Florent SCHILDKNECHT ([@flo-sch](https://github.com/flo-sch))
- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))
- Vlad Shcherbin ([@vladshcherbin](https://github.com/vladshcherbin))

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
- feat(css): remove deprecated theme.useBodyStyles ([@hasparus](https://github.com/hasparus))
- feat: create the allColorModes object in the context ([@fcisio](https://github.com/fcisio))

#### 🐛 Bug Fix

- Merge remote-tracking branch 'origin/develop' into v0.8 ([@hasparus](https://github.com/hasparus))
- refactor(css): remove emotion-theme import that did not land in user projects ([@hasparus](https://github.com/hasparus))
- Merge branch 'stable' into config-2 ([@hasparus](https://github.com/hasparus))
- Merge branch 'config' into config-2 [#1421](https://github.com/system-ui/theme-ui/pull/1421) ([@hasparus](https://github.com/hasparus))
- refactor: assemble the modes inside rawColors ([@fcisio](https://github.com/fcisio))
- fix: jdoc typo ([@fcisio](https://github.com/fcisio))
- Fix __internalGetUseRootStyles ([@lachlanjc](https://github.com/lachlanjc))
- refactor(css): move ThemeUIConfig to separate file ([@lachlanjc](https://github.com/lachlanjc))
- Merge branch 'develop' into config ([@lachlanjc](https://github.com/lachlanjc))
- refactor(css): move ThemeUIConfig to separate file ([@hasparus](https://github.com/hasparus))
- Re-add config options to root theme type as deprecated ([@lachlanjc](https://github.com/lachlanjc))
- Make internal root styles non-breaking ([@lachlanjc](https://github.com/lachlanjc))
- Begin moving theme config options ([@lachlanjc](https://github.com/lachlanjc))

#### ⚠️ Pushed to `stable`

- Merge branch 'stable' into develop ([@hasparus](https://github.com/hasparus))

#### Authors: 4

- Brent Jackson ([@jxnblk](https://github.com/jxnblk))
- Francis Champagne ([@fcisio](https://github.com/fcisio))
- Lachlan Campbell ([@lachlanjc](https://github.com/lachlanjc))
- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))

---

# v0.7.5 (Wed Apr 28 2021)

#### 🐛 Bug Fix

- Add 6 border logical color properties to scales [#1668](https://github.com/system-ui/theme-ui/pull/1668) ([@lachlanjc](https://github.com/lachlanjc))
- Add inline properties ([@lachlanjc](https://github.com/lachlanjc))
- Add 3 border logical color properties to scales ([@lachlanjc](https://github.com/lachlanjc))

#### ⚠️ Pushed to `stable`

- Merge branch 'develop' into stable ([@hasparus](https://github.com/hasparus))

#### Authors: 2

- Lachlan Campbell ([@lachlanjc](https://github.com/lachlanjc))
- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))

---

# v0.7.4 (Tue Apr 27 2021)

#### 🐛 Bug Fix

- Add 2 missing CSS column properties to scales [#1669](https://github.com/system-ui/theme-ui/pull/1669) ([@lachlanjc](https://github.com/lachlanjc))
- Add text-decoration-color to scales [#1667](https://github.com/system-ui/theme-ui/pull/1667) ([@lachlanjc](https://github.com/lachlanjc))
- Add 2 missing CSS column properties to scales ([@lachlanjc](https://github.com/lachlanjc))
- Add test ([@lachlanjc](https://github.com/lachlanjc))
- Add textDecorationColor to scales ([@lachlanjc](https://github.com/lachlanjc))

#### 🔩 Dependency Updates

- chore(deps-dev): bump @preconstruct/cli from 2.0.1 to 2.0.7 [#1674](https://github.com/system-ui/theme-ui/pull/1674) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Lachlan Campbell ([@lachlanjc](https://github.com/lachlanjc))

---

# v0.7.3 (Wed Apr 21 2021)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: David Dios ([@dios-david](https://github.com/dios-david))

:heart: Kenny ([@kenny-f](https://github.com/kenny-f))

#### 🐛 Bug Fix

- Adding `scroll-margin` props [#1664](https://github.com/system-ui/theme-ui/pull/1664) ([@dios-david](https://github.com/dios-david))
- Return negative number from lookup if theme value is a number [#1665](https://github.com/system-ui/theme-ui/pull/1665) ([@kenny-f](https://github.com/kenny-f))
- revert only tests ([@kenny-f](https://github.com/kenny-f))
- Return negative number from lookup if theme value is a number ([@kenny-f](https://github.com/kenny-f))
- adding scroll-margin props ([@dios-david](https://github.com/dios-david))

#### Authors: 2

- David Dios ([@dios-david](https://github.com/dios-david))
- Kenny ([@kenny-f](https://github.com/kenny-f))

---

# v0.7.0 (Thu Apr 15 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Carolin Maisenbacher ([@carolinmaisenbacher](https://github.com/carolinmaisenbacher)), for all your work!

#### 🚀 Enhancement

- WIP: Build packages with Preconstruct 2 [#1423](https://github.com/system-ui/theme-ui/pull/1423) ([@alexanderchan](https://github.com/alexanderchan) [@hasparus](https://github.com/hasparus))

#### 🐛 Bug Fix

- Make breakpoints accept custom mediaQueries ([@carolinmaisenbacher](https://github.com/carolinmaisenbacher))
- Merge branch 'develop' into preconstruct-2 ([@hasparus](https://github.com/hasparus))
- test: fix test types ([@hasparus](https://github.com/hasparus))
- test(css): update to make tests typecheck in strict mode ([@hasparus](https://github.com/hasparus))
- wip(workspace): update to preconstruct 2 ([@hasparus](https://github.com/hasparus))
- Merge branch 'add/preconstruct' into preconstruct-2 ([@hasparus](https://github.com/hasparus))
- Remove types reference since it comes from cjs.d.ts ([@alexanderchan](https://github.com/alexanderchan))
- Remove references to microbundle ([@alexanderchan](https://github.com/alexanderchan))
- Remove unused files ([@alexanderchan](https://github.com/alexanderchan))
- Run preconstruct fix to update main ([@alexanderchan](https://github.com/alexanderchan))

#### ⚠️ Pushed to `stable`

- Merge branch 'develop' into stable ([@hasparus](https://github.com/hasparus))

#### Authors: 3

- Alex Chan ([@alexanderchan](https://github.com/alexanderchan))
- Carolin Maisenbacher ([@carolinmaisenbacher](https://github.com/carolinmaisenbacher))
- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))
