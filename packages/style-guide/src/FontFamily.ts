import { get } from 'theme-ui'
import { useTheme } from './context'

export const FontFamily = ({ name }: { name: string }) => {
  const { fonts } = useTheme()!
  return get(fonts!, name)
}
