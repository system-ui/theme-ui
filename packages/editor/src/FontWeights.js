// fontWeights input
/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import Combobox from './Combobox'

const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900]

export default props => {
  const context = useThemeUI()
  const { fontWeights = {} } = context.theme

  const onChange = key => val => {
    context.setTheme({
      fontWeights: {
        [key]: val,
      },
    })
  }
  const keys = Object.keys(fontWeights)

  return (
    <div
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        mx: -1,
      }}>
      {keys.map(key => (
        <div
          key={key}
          sx={{
            flex: `1 1 96px`,
            px: 1,
          }}>
          <Combobox
            label={key}
            name={'fontWeights.' + key}
            value={fontWeights[key]}
            onChange={onChange(key)}
            options={weights}
          />
        </div>
      ))}
    </div>
  )
}
