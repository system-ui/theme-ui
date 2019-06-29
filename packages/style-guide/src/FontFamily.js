import { get } from 'theme-ui'
import { useThemeUI } from './context'

export const FontFamily = ({ name }) => {
  const { fonts } = useTheme()
  return get(fonts, name)
}
