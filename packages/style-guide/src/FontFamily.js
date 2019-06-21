import { get } from 'theme-ui'
import { useTheme } from './context'

export const FontFamily = ({ name }) => {
  const { fonts } = useTheme()
  return get(fonts, name)
}
