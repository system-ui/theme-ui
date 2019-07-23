# Changelog

## Unreleased

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
