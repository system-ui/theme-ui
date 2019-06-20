/*

From: https://github.com/jgthms/bulma/blob/master/sass/utilities/initial-variables.sass

// Colors

$black:        hsl(0, 0%, 4%) !default
$black-bis:    hsl(0, 0%, 7%) !default
$black-ter:    hsl(0, 0%, 14%) !default

$grey-darker:  hsl(0, 0%, 21%) !default
$grey-dark:    hsl(0, 0%, 29%) !default
$grey:         hsl(0, 0%, 48%) !default
$grey-light:   hsl(0, 0%, 71%) !default
$grey-lighter: hsl(0, 0%, 86%) !default

$white-ter:    hsl(0, 0%, 96%) !default
$white-bis:    hsl(0, 0%, 98%) !default
$white:        hsl(0, 0%, 100%) !default

$orange:       hsl(14,  100%, 53%) !default
$yellow:       hsl(48,  100%, 67%) !default
$green:        hsl(141, 71%,  48%) !default
$turquoise:    hsl(171, 100%, 41%) !default
$cyan:         hsl(204, 86%,  53%) !default
$blue:         hsl(217, 71%,  53%) !default
$purple:       hsl(271, 100%, 71%) !default
$red:          hsl(348, 100%, 61%) !default

// Typography

$family-sans-serif: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif !default
$family-monospace: monospace !default
$render-mode: optimizeLegibility !default

$size-1: 3rem !default
$size-2: 2.5rem !default
$size-3: 2rem !default
$size-4: 1.5rem !default
$size-5: 1.25rem !default
$size-6: 1rem !default
$size-7: 0.75rem !default

$weight-light: 300 !default
$weight-normal: 400 !default
$weight-medium: 500 !default
$weight-semibold: 600 !default
$weight-bold: 700 !default

// Spacing

$block-spacing: 1.5rem !default

// Responsiveness

// The container horizontal gap, which acts as the offset for breakpoints
$gap: 32px !default
// 960, 1152, and 1344 have been chosen because they are divisible by both 12 and 16
$tablet: 769px !default
// 960px container + 4rem
$desktop: 960px + (2 * $gap) !default
// 1152px container + 4rem
$widescreen: 1152px + (2 * $gap) !default
$widescreen-enabled: true !default
// 1344px container + 4rem
$fullhd: 1344px + (2 * $gap) !default
$fullhd-enabled: true !default

// Miscellaneous

$easing: ease-out !default
$radius-small: 2px !default
$radius: 4px !default
$radius-large: 6px !default
$radius-rounded: 290486px !default
$speed: 86ms !default

// Flags

$variable-columns: true !default
*/

/* Mappings from https://github.com/jgthms/bulma/blob/master/sass/utilities/derived-variables.sass
$primary: $turquoise !default

$info: $cyan !default
$success: $green !default
$warning: $yellow !default
$danger: $red !default

$light: $white-ter !default
$dark: $grey-darker !default

// Invert colors

$orange-invert: findColorInvert($orange) !default
$yellow-invert: findColorInvert($yellow) !default
$green-invert: findColorInvert($green) !default
$turquoise-invert: findColorInvert($turquoise) !default
$cyan-invert: findColorInvert($cyan) !default
$blue-invert: findColorInvert($blue) !default
$purple-invert: findColorInvert($purple) !default
$red-invert: findColorInvert($red) !default

$primary-invert: $turquoise-invert !default
$info-invert: $cyan-invert !default
$success-invert: $green-invert !default
$warning-invert: $yellow-invert !default
$danger-invert: $red-invert !default
$light-invert: $dark !default
$dark-invert: $light !default

// General colors

$background: $white-ter !default

$border: $grey-lighter !default
$border-hover: $grey-light !default

// Text colors

$text: $grey-dark !default
$text-invert: findColorInvert($text) !default
$text-light: $grey !default
$text-strong: $grey-darker !default

// Code colors

$code: $red !default
$code-background: $background !default

$pre: $text !default
$pre-background: $background !default

// Link colors

$link: $blue !default
$link-invert: $blue-invert !default
$link-visited: $purple !default

$link-hover: $grey-darker !default
$link-hover-border: $grey-light !default

$link-focus: $grey-darker !default
$link-focus-border: $blue !default

$link-active: $grey-darker !default
$link-active-border: $grey-dark !default

// Typography

$family-primary: $family-sans-serif !default
$family-secondary: $family-sans-serif !default
$family-code: $family-monospace !default

$size-small: $size-7 !default
$size-normal: $size-6 !default
$size-medium: $size-5 !default
$size-large: $size-4 !default

// Lists and maps
$custom-colors: null !default
$custom-shades: null !default

$colors: mergeColorMaps(("white": ($white, $black), "black": ($black, $white), "light": ($light, $light-invert), "dark": ($dark, $dark-invert), "primary": ($primary, $primary-invert), "link": ($link, $link-invert), "info": ($info, $info-invert), "success": ($success, $success-invert), "warning": ($warning, $warning-invert), "danger": ($danger, $danger-invert)), $custom-colors) !default
$shades: mergeColorMaps(("black-bis": $black-bis, "black-ter": $black-ter, "grey-darker": $grey-darker, "grey-dark": $grey-dark, "grey": $grey, "grey-light": $grey-light, "grey-lighter": $grey-lighter, "white-ter": $white-ter, "white-bis": $white-bis), $custom-shades) !default

$sizes: $size-1 $size-2 $size-3 $size-4 $size-5 $size-6 $size-7 !default
*/

/**
 * See also
 * - https://github.com/jgthms/bulma/blob/master/sass/base/minireset.sass
 * - https://github.com/jgthms/bulma/blob/master/sass/base/generic.sass
 */

export const baseColors = {
  black:        'hsl(0, 0%, 4%)',
  blackBis:     'hsl(0, 0%, 7%)',
  blackTer:     'hsl(0, 0%, 14%)',
  // (sic)
  greyDarker:   'hsl(0, 0%, 21%)',
  greyDark:     'hsl(0, 0%, 29%)',
  grey:         'hsl(0, 0%, 48%)',
  greyLight:    'hsl(0, 0%, 71%)',
  greyLighter:  'hsl(0, 0%, 86%)',
  whiteTer:     'hsl(0, 0%, 96%)',
  whiteBis:     'hsl(0, 0%, 98%)',
  white:        'hsl(0, 0%, 100%)',
  orange:       'hsl(14,  100%, 53%)',
  yellow:       'hsl(48,  100%, 67%)',
  green:        'hsl(141, 71%,  48%)',
  turquoise:    'hsl(171, 100%, 41%)',
  cyan:         'hsl(204, 86%,  53%)',
  blue:         'hsl(217, 71%,  53%)',
  purple:       'hsl(271, 100%, 71%)',
  red:          'hsl(348, 100%, 61%)',
}

export const colors = {
  ...baseColors,
  text: baseColors.greyDark,
  background: baseColors.white,
  primary: baseColors.blue,
  muted: baseColors.whiteTer,
  // bulma-specific
  info: baseColors.cyan,
  success: baseColors.green,
  warning: baseColors.yellow,
  danger: baseColors.red,
  light: baseColors.whiteTer,
  dark: baseColors.greyDarker,
  modes: {
    invert: {
    },
  },
}

export const fonts = {
  body: 'BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
  heading: 'inherit',
  monospace: 'monospace',
}

export const fontSizes = [
  '0.75rem',
  '0.875rem', // tweener
  '1rem',
  '1.25rem',
  '1.5rem',
  '1.75rem',
  '2rem',
  '2.5rem',
  '3rem',
]

export const fontWeights = {
  body: 400,
  heading: 700,
  bold: 700,
  light: 300,
  medium: 500,
  semibold: 500,
}

export const lineHeights = {
  body: 1.5,
  heading: 1.125,
}

// guesstimate
export const space = [
  0,
  0.5,
  1,
  1.5,
  2,
  2.5,
  3,
].map(n => n + 'rem')

const heading = {
  fontFamily: 'heading',
  fontWeight: 'heading',
  lineHeight: 'heading',
  m: 0,
  mb: 1,
}

// needs works
export const styles = {
  root: {
    fontFamily: 'body',
    lineHeight: 'body',
    fontWeight: 'body',
  },
  a: {
    color: 'primary',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  h1: {
    ...heading,
    fontSize: 6,
    mt: 2,
  },
  h2: {
    ...heading,
    fontSize: 5,
    mt: 2,
  },
  h3: {
    ...heading,
    fontSize: 4,
    mt: 3,
  },
  h4: {
    ...heading,
    fontSize: 3,
  },
  h5: {
    ...heading,
    fontSize: 2,
  },
  h6: {
    ...heading,
    fontSize: 1,
    mb: 2,
  },
  code: {},
  pre: {},
  hr: {
    bg: 'muted',
    border: 0,
    height: '1px',
    m: 3,
  },
}

export const bulma = {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  space,
  styles,
}

export default bulma
