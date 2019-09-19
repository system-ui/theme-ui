import { useThemeUI } from 'theme-ui'
import useBreakpointIndex from './useBreakpointIndex'

const useResponsiveValue = values => {
  const { theme } = useThemeUI()
  const array = typeof values === 'function' ? values(theme) : values
  const index = useBreakpointIndex()
  return array[index >= array.length ? array.length - 1 : index]
}

export default useResponsiveValue
