# v0.14.4 (Sat Apr 23 2022)

:tada: This release contains work from a new contributor! :tada:

Thank you, kamatte ([@kamatte-me](https://github.com/kamatte-me)), for all your work!

#### 🐛 Bug Fix

- fix: Donut component's `viewBox` svg property [#2209](https://github.com/system-ui/theme-ui/pull/2209) ([@kamatte-me](https://github.com/kamatte-me))
- fix: Donut component's `viewBox` svg property ([@kamatte-me](https://github.com/kamatte-me))

#### Authors: 3

- kamatte ([@kamatte-me](https://github.com/kamatte-me))
- Lachlan Campbell ([@lachlanjc](https://github.com/lachlanjc))
- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))

---

# v0.14.1 (Tue Mar 22 2022)

#### 🐛 Bug Fix

- fix(components): add missing forwardRef and fix Switch props ([@hasparus](https://github.com/hasparus))

#### Authors: 1

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

# v0.11.3 (Fri Sep 24 2021)

#### 🐛 Bug Fix

- Patch GridProps [#1933](https://github.com/system-ui/theme-ui/pull/1933) ([@aaronadamsCA](https://github.com/aaronadamsCA))
- Patch GridProps ([@aaronadamsCA](https://github.com/aaronadamsCA))

#### Authors: 1

- Aaron Adams ([@aaronadamsCA](https://github.com/aaronadamsCA))

---

# v0.11.0 (Wed Aug 25 2021)

#### 🐛 Bug Fix

- 0.10 chores [#1842](https://github.com/system-ui/theme-ui/pull/1842) ([@hasparus](https://github.com/hasparus))

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

- feat(components): style autofilled Input background ([@hasparus](https://github.com/hasparus))

#### 🐛 Bug Fix

- Allow easy styling autofilled of Inputs [#1811](https://github.com/system-ui/theme-ui/pull/1811) ([@hasparus](https://github.com/hasparus))
- Add missing meta repository to published packages [#1807](https://github.com/system-ui/theme-ui/pull/1807) ([@aaronadamsCA](https://github.com/aaronadamsCA))
- Add missing repository metadata to published packages [#1779](https://github.com/system-ui/theme-ui/pull/1779) ([@aaronadamsCA](https://github.com/aaronadamsCA))
- Add missing meta repository to published packages ([@aaronadamsCA](https://github.com/aaronadamsCA))

#### 🏠 Internal

- Docs: update JSX pragma guide with automatic runtime section [#1718](https://github.com/system-ui/theme-ui/pull/1718) ([@flo-sch](https://github.com/flo-sch) [@hasparus](https://github.com/hasparus))
- docs(components): fix Paragraph default variant [#1807](https://github.com/system-ui/theme-ui/pull/1807) ([@bernharduw](https://github.com/bernharduw))
- docs(components): fix Paragraph default variant [#1795](https://github.com/system-ui/theme-ui/pull/1795) ([@bernharduw](https://github.com/bernharduw))

#### Authors: 6

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Aaron Adams ([@aaronadamsCA](https://github.com/aaronadamsCA))
- Bernhard Gschwantner ([@bernharduw](https://github.com/bernharduw))
- Florent SCHILDKNECHT ([@flo-sch](https://github.com/flo-sch))
- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))
- Vlad Shcherbin ([@vladshcherbin](https://github.com/vladshcherbin))

---

# v0.9.1 (Wed May 26 2021)

#### 🐛 Bug Fix

- fix: Allow overriding Paragraph margins via theme [#1775](https://github.com/system-ui/theme-ui/pull/1775) ([@bernharduw](https://github.com/bernharduw))
- fix(components): allow themed Paragraph margins ([@bernharduw](https://github.com/bernharduw))

#### Authors: 1

- Bernhard Gschwantner ([@bernharduw](https://github.com/bernharduw))

---

# v0.8.3 (Wed May 05 2021)

#### ⚠️ Pushed to `stable`

- Merge branch 'stable' into develop ([@hasparus](https://github.com/hasparus))

#### Authors: 1

- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))

---

# v0.8.0 (Wed May 05 2021)

#### 🐛 Bug Fix

- Merge branch 'config' into config-2 [#1421](https://github.com/system-ui/theme-ui/pull/1421) ([@hasparus](https://github.com/hasparus))
- Merge branch 'develop' into config ([@lachlanjc](https://github.com/lachlanjc))

#### ⚠️ Pushed to `stable`

- Merge branch 'stable' into develop ([@hasparus](https://github.com/hasparus))

#### Authors: 3

- Brent Jackson ([@jxnblk](https://github.com/jxnblk))
- Lachlan Campbell ([@lachlanjc](https://github.com/lachlanjc))
- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))

---

# v0.7.5 (Wed Apr 28 2021)

#### ⚠️ Pushed to `stable`

- Merge branch 'develop' into stable ([@hasparus](https://github.com/hasparus))

#### Authors: 1

- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))

---

# v0.7.1 (Mon Apr 19 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Jonathan Van Buren ([@vanbujm](https://github.com/vanbujm)), for all your work!

#### 🐛 Bug Fix

- fix(components): Allow styled-system space props on Paragraph [#1658](https://github.com/system-ui/theme-ui/pull/1658) ([@vanbujm](https://github.com/vanbujm))
- fix(components) Updated Paragraph component to allow overriding the margin using styled-system space props ([@vanbujm](https://github.com/vanbujm))

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

- Merge branch 'develop' into preconstruct-2 ([@hasparus](https://github.com/hasparus))
- chore: fix theme-ui/css dependency version ([@hasparus](https://github.com/hasparus))
- wip(workspace): update to preconstruct 2 ([@hasparus](https://github.com/hasparus))
- Merge branch 'add/preconstruct' into preconstruct-2 ([@hasparus](https://github.com/hasparus))
- Remove references to microbundle ([@alexanderchan](https://github.com/alexanderchan))
- Remove unused files ([@alexanderchan](https://github.com/alexanderchan))
- Run preconstruct fix to update main ([@alexanderchan](https://github.com/alexanderchan))

#### ⚠️ Pushed to `stable`

- Merge branch 'develop' into stable ([@hasparus](https://github.com/hasparus))

#### Authors: 2

- Alex Chan ([@alexanderchan](https://github.com/alexanderchan))
- Piotr Monwid-Olechnowicz ([@hasparus](https://github.com/hasparus))
