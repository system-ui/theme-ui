// convert base theme-ui object to theme.styles
// similar to typography.js style output
// - only includes styles for markdown elements
// - does not include color styles
// - does not include responsive styles

import assign from 'object-assign'

const reset = {
  margin: 0,
  padding: 0,
}
const heading = {}
const defaultStyles = {
  img: {},
  h1: heading,
  h2: heading,
  h3: heading,
  h4: heading,
  h5: heading,
  h6: heading,
  ul: {},
  ol: {},
  li: {},
  p: {},
  pre: {},
  table: {},
  thead: {},
  th: {},
  td: {},
  blockquote: {},
  hr: {},
  b: {},
  strong: {},
  code: {},
  pre: {},
  // a: {},
}

export const toThemeStyles = theme => {
  let styles = { ...defaultStyles }
  // static/defaults
  // root
  // h1-h6
  // p
  // ul/ol
  // bold
  return styles
}

export default toThemeStyles
