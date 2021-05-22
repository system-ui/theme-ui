/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import * as CSS from 'csstype'
import { Fragment } from 'react'
import Combobox from '../Combobox'
import { EditorContextValue } from '../types'

const defaultFonts = [
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  '"Helvetica Neue", Helvetica, Arial, sans-serif',
  '"Avenir Next", Helvetica, Arial, sans-serif',
  'Verdana, sans-serif',
  'Georgia, serif',
  'Inter, sans-serif',
  'Roboto, sans-serif',
  '"Roboto Condensed", sans-serif',
  '"Roboto Mono", monospace',
  '"Roboto Slab", serif',
  '"Open Sans", sans-serif',
  'Lato, sans-serif',
  'Montserrat, sans-serif',
  '"Source Sans Pro", sans-serif',
  '"Source Serif Pro", serif',
  '"Source Code Pro", monospace',
  '"Raleway", sans-serif',
  '"Oswald", sans-serif',
  '"Merriweather", serif',
  'Menlo, monospace',
]

const Fonts = ({ options = defaultFonts }) => {
  const context = useThemeUI() as EditorContextValue
  const { fonts = {} } = context.theme || {}

  const onChange = (key: string) => (val: CSS.Property.FontFamily) => {
    context.setTheme({
      fonts: {
        [key]: val,
      },
    })
  }

  return (
    <Fragment>
      {Object.keys(fonts).map((key) => (
        <div key={key}>
          <Combobox
            label={key}
            name={'fonts.' + key}
            value={fonts[key as keyof typeof fonts] as CSS.Property.FontFamily}
            onChange={onChange(key)}
            options={options}
          />
        </div>
      ))}
    </Fragment>
  )
}

export default Fonts
