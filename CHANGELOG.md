# Changelog

## Unreleased

## v0.2.41 2019-09-05

- Updated `@theme-ui/editor` package
- New [Customize page](https://theme-ui.com/customize)

## v0.2.40 2019-09-03

- Pass outer context through RootProvider #340
- Update dependencies

## v0.2.38 2019-08-29

- Added new `ColorPicker` component to `@theme-ui/editor` #327
- Added warning for conflicting versions of Emotion #297
- Added color utility package #331

## v0.2.37 2019-08-26

- Update dependencies

## v0.2.36 2019-08-22

- Added `gatsby-theme-ui-blog` package #311
- Added `gatsby-theme-code-recipe` package #313
- Updated styles in `gatsby-theme-style-guide` #315

## v0.2.35 2019-08-15

- Adds `gatsby-theme-style-guide` package #301
- Fix for `jsx` create element function #302

## v0.2.34 2019-08-15

- `gatsby-plugin-theme-ui` remove JSX syntax from gatsby-ssr in Gatsby plugin #299
- `@theme-ui/typography` fix for CSS font-family keywords #285
- `@theme-ui/preset-tailwind` add button and input variants #291

## v0.2.33 2019-08-12

- Add support for FOUC fix in Next.js #277
- Update dependencies

## v0.2.32 2019-08-08

- Add accordion sidenav #279

## v0.2.31 2019-08-07

- Maintain raw color values in Theme UI context when `useCustomProperties` is enabled #274

## v0.2.30 2019-08-06

- Updates for tailwind preset #272

## v0.2.29 2019-08-05

- Update dependencies

## v0.2.28 2019-08-03

- Add tosh preset #264

## v0.2.27 2019-08-03

- Bad lerna publish

## v0.2.26 2019-08-02

- Fix for CSS custom properties when using nested color objects #259
- Add warning when `initialColorMode` matches a color mode name #245
- Fix for forwarding refs #261
- Fix peer dependency version #263

## v0.2.25 2019-07-31

- Add `@theme-ui/custom-properties` package #235

## v0.2.24 2019-07-29

- Adds preset packages #210

## v0.2.23 2019-07-29

- Add base colors to prism presets #249
- Add key to element in gatsby-plugin-theme-ui #248
- Add metadata to packages #244
- Update docs

## v0.2.22 2019-07-29

- Update dependencies

## v0.2.21 2019-07-26

- Add presets to `@theme-ui/prism` #231
- Fix array merging #230

## v0.2.20 2019-07-26

- Fix for color mode in context #226

## v0.2.19 2019-07-24

- Fix for unsupported Prism languages #218
- Update dependencies

## v0.2.18 2019-07-23

- Update docs
- Update dependencies

## v0.2.16 2019-07-22

- Forward all props to functional components #197

## v0.2.15 2019-07-22

- Update dependencies

## v0.2.14 2019-07-15

- Only pass `css` prop through when needed in `jsx` #182

## v0.2.13 2019-07-11

## v0.2.12 2019-07-11

- Fix bad publish

## v0.2.11 2019-07-11

- Adds Chrome extension package #136

## v0.2.10 2019-07-08

- Fix keys in tailwind preset #171

## v0.2.9 2019-07-08

- Add optional support for CSS custom properties #166

## v0.2.8 2019-07-06

- `@theme-ui/sidenav` initial publish
- `@theme-ui/prism` add `display: inline-block` to keep empty lines

## v0.2.7 2019-07-05

- `@theme-ui/prism` pass outer className to element #163

## v0.2.6 2019-07-04

- Adjust color mode initialization from media query #157

## v0.2.5 2019-07-03

- Fix publish

## v0.2.4 2019-07-03

- Adjust microbundle setup for @theme-ui/prism

## v0.2.3 2019-07-02

- Add @theme-ui/prism package

## v0.2.2 2019-07-02

- Add `key` prop to element in gatsby-plugin-theme-ui #145
- Update docs

## v0.2.1 2019-06-30

- Rename `gatsby-plugin-theme-ui` #137
- Update docs

## v0.2.0 2019-06-24

- Replaced `lodash.merge` with `deepmerge`
- Updated to use smaller Styled System v5 packages
- Removed layout and flexbox style props from `Box` and layout components
- Renamed `css` prop in experimental custom pragma to `sx` to avoid collisions with Emotion and other libraries
- Refactored `ThemeProvider`
- Removed `toStyle` API from Typography.js package
- Renamed Typography.js package to `@theme-ui/typography`
- Removed `@emotion/styled` dependency - layout components are no longer created with `styled` so passing non-HTML attributes to the component will result in React rendering those props to the DOM
- Removed legacy `ColorModeProvider` and `ComponentProvider` exports
