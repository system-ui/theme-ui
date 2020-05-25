import { jsx as themeuijsx } from 'theme-ui'
import { get } from '@theme-ui/css'
import { scales, aliases } from './css'
// Always inject the CSS reset. You should not be able to use strict-ui without it.
import './sanitize.css'

export { ThemeProvider, useThemeUI as useStrictUI } from 'theme-ui'
export { Grid } from '@theme-ui/components'
export * from './Flex'

export const jsx = (type, props, ...children) => {
  if (props && props.css) throw new Error('Using the `css` prop is disallowed.')

  if (process.env.NODE_ENV !== 'production' && props && props.sx) {
    const filteredCSSProps = [
      // General
      'box-sizing',
      'float',
      'margin',
      'margin-top',
      'margin-left',
      'margin-right',
      'margin-bottom',
      'margin-x',
      'margin-y',
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

    const dashize = (str: string) => {
      return str.replace(/(\w)([A-Z])/g, (word, first, second) => {
        return `${first}-${second.toLowerCase()}`
      })
    }

    for (const prop of Object.keys(props.sx)) {
      const alias = prop in aliases ? aliases[prop] : prop

      // Filter certain CSS properties like e.g. margin
      if (
        filteredCSSProps.indexOf(dashize(prop)) > -1 ||
        (aliases[prop] &&
          (filteredCSSProps.indexOf(aliases[prop]) > -1 ||
            filteredCSSProps.indexOf(dashize(aliases[prop])) > -1))
      )
        throw new Error(`Cannot specify disallowed CSS property "${prop}".`)

      // Disallow non theme-based values for properties that are in the theme
      if (scales[alias]) {
        const value = props.sx[prop]
        props.sx[prop] = (theme) => {
          const scale = get(theme, scales[alias])
          if (!scale)
            throw new Error(
              `Cannot specify "${prop}" because no "${scales[alias]}" scale is defined in the theme.`
            )

          const valuesToCheck = Array.isArray(value) ? value : [value]

          valuesToCheck.forEach((toCheck) => {
            const scaleValue = get(scale, toCheck)

            if (!scaleValue) {
              throw new Error(
                `Cannot use a non-theme value "${toCheck}" for "${prop}". Please either use a theme value or add a new value to the theme.`
              )
            }
          })

          return value
        }
      }
    }
  }

  return themeuijsx(type, props, ...children)
}
