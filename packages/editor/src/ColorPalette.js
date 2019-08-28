/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { ColorPalette } from '@theme-ui/style-guide'
import ColorPicker from './ColorPicker'

export default props => {
  const context = useThemeUI()

  return (
    <ColorPalette
      {...props}
      render={({ swatch, color, ...rest }) =>
        console.log({ color, rest }) || (
          <ColorPicker
            color={color}
            onChange={val => {
              console.log(val)
            }}>
            {swatch}
          </ColorPicker>
        )
      }
    />
  )
}
