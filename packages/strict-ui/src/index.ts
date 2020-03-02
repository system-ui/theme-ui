import { jsx as themeuijsx, useThemeUI } from 'theme-ui'
import { scales, transforms, aliases, get } from '@theme-ui/css'

const filteredCSSProps = [
  // General
  'box-sizing',
  'float',
  'margin',
  'margin-top',
  'margin-left',
  'margin-right',
  'margin-bottom',
  'display', // TBD!
  // Flexbox
  'justify-content',
  'align-items',
  'order',
  'flex-direction',
  'flex-grow',
  'flex-wrap',
  'flex-shrink',
  'flex-basis',
  'flex-flow',
  'flex',
  'align-self',
  'align-content',
  // Grid
  'grid-column-start',
  'grid-column-end',
  'grid-row-start',
  'grid-row-end',
  'grid-template-columns',
  'grid-template-rows',
  'grid-column',
  'grid-row',
  'grid-area',
  'grid-template-areas',
  'justify-self',
  'grid-template',
  'grid-column-gap',
  'grid-row-gap',
  'grid-gap',
  'place-self',
  'place-items',
  'place-content',
  'grid-auto-columns',
  'grid-auto-rows',
  'grid-auto-flow',
  'grid',
]

export { Grid } from 'theme-ui'

function dashize(str: string) {
  return str.replace(/(\w)([A-Z])/g, (word, first, second) => {
    return `${first}-${second.toLowerCase()}`
  })
}

export const jsx = (type, props, ...children) => {
  if (props.css) throw new Error('Using the `css` prop is disallowed.')

  if (process.env.NODE_ENV !== 'production' && props.sx) {
    for (const prop of Object.keys(props.sx)) {
      const alias = prop in aliases ? aliases[prop] : prop

      // Filter certain CSS properties like e.g. margin
      if (
        filteredCSSProps.indexOf(dashize(prop)) > -1 ||
        filteredCSSProps.indexOf(aliases[prop]) > -1
      )
        throw new Error(`Cannot specify CSS property "${prop}".`)

      // Disallow non theme-based values for properties that are in the theme
      if (scales[alias]) {
        const value = props.sx[prop]
        props.sx[prop] = theme => {
          const scale = get(theme, scales[alias])
          const transform = get(transforms, prop, get)
          const transformedValue = transform(scale, value, value)

          if (transformedValue === value) {
            throw new Error(
              `Cannot use a non-theme value "${value}" for "${prop}". Please either use a theme value or add a new value to the theme.`
            )
          }

          return transformedValue
        }
      }
    }
  }

  return themeuijsx(type, props, ...children)
}
