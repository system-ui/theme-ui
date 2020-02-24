import { jsx as themeuijsx } from 'theme-ui'

const filteredCSSProps = [
  // General
  'box-sizing',
  'float',
  'margin',
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

export * from 'theme-ui'

export const jsx = (type, props, ...children) => {
  if (props.css) throw new Error('Using the `css` prop is disallowed.')

  if (props.sx) {
    for (const prop of Object.keys(props.sx)) {
      if (filteredCSSProps.indexOf(prop) > -1)
        throw new Error(`Cannot specify CSS property "${prop}".`)
    }
  }

  return themeuijsx(type, props, ...children)
}
