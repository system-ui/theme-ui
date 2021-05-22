# Migration Guides

## v0.8

**Theme configuration options were moved to `theme.config` object.**

- **Deprecations:** `useRootStyles`, `useCustomProperties`,
  `useColorSchemeMediaQuery`, `useBorderBox`, and `useLocalStorage` options on
  the theme object are now scoped under a `config` object on the theme, and the
  root-level options, now deprecated, will be removed in a future release.

  (e.g. you should be setting `theme.config.useBorderBox` instead of
  `theme.useBorderBox`)

  - ⚠ All config options should be migrated at once. If Theme UI sees
    `theme.config` exists, it won't look for options on the `theme`.

**APIs deprecated in v0.6 were removed.**

- `theme.useBodyStyles` ⟶ `theme.config.useRootStyles`
- `Styled` ⟶ `Themed`

Following the deprecation of `useBodyStyles`, `useRootStyles` now defaults to
true. This means that your styles from `theme.styles.root` are now applied to
`<html>` element, not `<body>` element. Most use cases should be fine, but some
styles may need adjustment.

## v0.6

### What's New

- `Styled` components dict was renamed to [`Themed`](/themed/) to avoid
  confusion with `styled` components constructors from `@emotion/styled` and
  similar libraries.

- `theme.useRootStyles` configuration option (false by default). Set it to
  `true` to add `styles.root` to `html` instead of `body`.

  - `theme.useBodyStyles` configuration option still defaults to `true`, but
    it's going in to be deprecated in favor of `theme.useRootStyles` in the
    future.

- New scale: `transitions` supporting `transition` CSS property. Issue
  [#1079](https://github.com/system-ui/theme-ui/issues/1079), PR
  [#1272](https://github.com/system-ui/theme-ui/pull/1272)

- Objects in nested scales can now have a `__default` key. PR
  [#951](https://github.com/system-ui/theme-ui/pull/951)

  Given the theme

  ```
  const theme = {
    colors: {
      primary: {
        __default: '#00f',
        light: '#33f',
      }
    }
  }
  ```

  `color: 'primary'` resolves to `color: '#00f'`.

- Configuration option for printing color mode. PR
  [#1267](https://github.com/system-ui/theme-ui/pull/1267), issue
  [#1144](https://github.com/system-ui/theme-ui/issues/1144). No more wasted
  ink.

  ```
  {
    initialColorModeName: "dark",
    printColorModeName: "light"
  }
  ```

- A new component, Paragraph was added in PR
  [#1298](https://github.com/system-ui/theme-ui/pull/1298)

### Breaking Changes

- Theme UI 0.6 depends on Emotion 11, and isn't compatible with Emotion 10
  anymore.

  - If you didn't install Emotion separately, this update shouldn't affect you.
  - If your other dependencies depend on Emotion 10, and have no published
    versions for Emotion 11, you can use
    [Yarn resolutions](https://yarnpkg.com/lang/en/docs/selective-version-resolutions/)
    or
    [Webpack's resolve.alias](https://webpack.js.org/configuration/resolve/#resolvealias)
    to enforce a version.

  Refer to [Emotion 11 release notes](https://emotion.sh/docs/emotion-11) for
  more information.

- Color mode flash on first render is gone, but to achieve this we had to bring
  back `theme.rawColors`.

  - **You can no longer read raw color values from `theme.colors`** when reading
    theme from `useThemeUI` or inside `sx`.
  - `.colors` object contains Custom CSS Properties now.
  - If you need to pass original value somewhere where CSS Properties (e.g.
    WebGL Canvas) won't work use `.rawColors`.

  **How to migrate?**

  Find places where you read `colors` from the _useThemeUI_ and extract
  `rawColors` instead of `colors`.

  ```tsx
  const { rawColors: colors } = useThemeUI().theme
  ```

- Default color mode name is no longer `"default"` — it's now `undefined`, what
  represents the lack of color mode set by user or detected from preferences.

- `useColorSchemeMediaQuery` defaults to `true`. Issue
  [#624](https://github.com/system-ui/theme-ui/issues/624), PR
  [#1373](https://github.com/system-ui/theme-ui/pull/1373)

  **How to migrate?** Add `useColorSchemeMediaQuery: false` to your theme if you
  don't have this property.
  [Read more in the docs.](https://dev.theme-ui.com/color-modes/#responding-to-the-prefers-color-scheme-media-query)

- We no longer export internal React context named as `Context` 😅 It wasn't and
  it's still not public API, but if you used it and _you really_ need it, you
  can grab it as `__ThemeUIContext`. (But please don't do this. Use
  `ThemeProvider` from _@theme-ui/core_ for local theme overrides instead.)

### Deprecations

- `Styled` will be removed in v0.7. Use [`Themed`](/themed) instead.
- `useBodyStyles` will be removed in v0.7. Use `useRootStyles` instead.

### <img src="https://emojis.slackmojis.com/emojis/images/1479745458/1383/typescript.png?1479745458" width="20" height="20" /> TypeScript Changes

Theme UI is now written in TypeScript, and the emitted types differ from
`@types/theme-ui`.

- `false` in now accepted in responsive tuple types. PR
  [#1499](https://github.com/system-ui/theme-ui/pull/1499)

- Known colors (_primary_, _text_, _background_, _accent_, _secondary_) in
  `ColorMode` can now be nested scales.

  The following no longer typechecks, as `colors.primary` can be an object.

  ```tsx
  sx={{
    color: theme => theme.colors?.primary?.toUpperCase()
  }}
  ```

  But the following code still works.

  ```tsx
  sx={{
    color: theme => theme.colors?.primary
  }}
  ```

  If `colors.primary` is an object, `colors.primary.__default` is used.

- `false` values are skipped before passing style objects to Emotion. Issue
  [#1297](https://github.com/system-ui/theme-ui/issues/1297), PR
  [#1460](https://github.com/system-ui/theme-ui/pull/1460).

  The following syntax is now supported

  ```tsx
  sx={{ color: isActive && blue }}
  ```

- "as" prop on Themed.X components now properly opts out of typechecking

  - TypeScript users, don't use `ComponentProps<typeof Themed['div']>`, import
    `ThemedComponent` and use `ThemedComponent<'div'>` instead.

- Theme UI 0.6 depends on [`csstype`](https://github.com/frenic/csstype) v3
  instead of `csstype` v2.

- Renamed types
  - Anything copied from `styled-system` types was renamed or removed.
  - `SxProps` was renamed to `SxProp`.
  - `SxStyleProp`, an alias for `ThemeUIStyleObject` was removed. Use
    `ThemeUIStyleObject` instead.

[**Refer to the changelog for a full list of changes.**](https://github.com/system-ui/theme-ui/blob/develop/CHANGELOG.md)

## v0.3

### What's New

- Components can now be imported directly from the `theme-ui` package. Be sure
  that treeshaking is enabled with your build tool.
- Includes smart defaults for adding base styles to the `<body>` element.
- Simplified color modes API.
- New `@theme-ui/css`, `@theme-ui/core`, `@theme-ui/color-modes`, and
  `@theme-ui/mdx` packages allow for more bespoke ways to use the library.

### Breaking Changes

- `@emotion/react` and `@mdx-js/react` are now dependencies of `theme-ui` and
  should not be installed separately. If you'd like to use a particular version
  of each library, use
  [Yarn resolutions](https://yarnpkg.com/lang/en/docs/selective-version-resolutions/).
- Theme UI context no longer provides `context.components`. If you're using this
  object from context, use the MDX hook instead. E.g.
  `import { useMDXComponents } from '@mdx-js/react'`
- If you'd like color mode to be initialized from the `prefers-color-scheme`
  media query, you must enable the `useColorSchemeMediaQuery: true` flag in your
  theme.
- The `ColorMode` component is deprecated and no longer required to add color
  styles to the `<body>` element.
- The following components have been removed in favor of using `Box` and `Flex`
  components: `Layout`, `Header`, `Main`, `Footer`
- The `initialColorMode` flag no longer works, use `initialColorModeName`
  instead.
- The `ThemeProvider` now adds global typographic styles to the `<body>` element
  based on `theme.styles.root`. To disable this behavior set the
  `useBodyStyles: false` flag in your theme.
- Theme context is now stateless. If you've made use of `context.setTheme`, this
  no longer works. An alternative approach is available with the
  `@theme-ui/editor` package.
- The `ThemeStateProvider` component is no longer avialable, see
  `@theme-ui/editor` as an alternative.
- The `@theme-ui/editor` package has a completely new API. Please refer to the
  package's
  [README.md](https://github.com/system-ui/theme-ui/blob/stable/packages/editor/README.md)
  for more information.

## v0.2

### JSX Pragma

If you were using the Theme UI custom JSX pragma, rename the `css` prop to `sx`.
This does not apply if you were importing and using the `css` utility function
manually.

### `theme-ui-typography`

If you were using the `theme-ui-typography` package, install the new package
named `@theme-ui/typography` instead. The `toStyle` API is no longer included.
Use the `toTheme` API instead, see the
[Typography.js docs](/styling-mdx/#typographyjs) for how to use this utility.

### `Box` and layout component

If you were using Styled System style props on the `Box` component or any other
layout component, replace these props with either the [`sx` prop](/sx-prop) or
by using the `css` utility.

### Other

- Replace `ColorModeProvider` and `ComponentProvider` with the `ThemeProvider`
  component.
- The `@emotion/styled` package is no longer required for Theme UI. If you are
  not using it directly in your application, you can remove it from your
  dependencies.
