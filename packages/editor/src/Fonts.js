// fonts input
/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import Combobox from './Combobox'

const defaultFonts = [
  'system-ui, sans-serif',
  '"Helvetica Neue", Helvetica, Arial, sans-serif',
  '"Avenir Next", Helvetica, Arial, sans-serif',
  'Verdana, sans-serif',
  'Georgia, serif',
  'Roboto, sans-serif',
  '"Open Sans", sans-serif',
  'Menlo, monospace',
  '"Roboto Condensed", sans-serif',
  '"Roboto Mono", monospace',
  'Inter, sans-serif',
]

export default props => {
  const context = useThemeUI()
  const { fonts = {} } = context.theme

  const onChange = key => val => {
    context.setTheme({
      fonts: {
        [key]: val,
      },
    })
  }

  return (
    <div
      sx={{
        fontFamily: 'system-ui, sans-serif',
      }}>
      {Object.keys(fonts).map(key => (
        <div
          key={key}
          sx={{
            mb: 2,
          }}>
          <Combobox
            label={key}
            name={key}
            value={fonts[key]}
            onChange={onChange(key)}
            options={defaultFonts}
            preview={val => <span sx={{ fontFamily: val }}>Aa</span>}
          />
        </div>
      ))}
    </div>
  )
}
