import { useThemeUI } from 'theme-ui'
import useBreakpointIndex from './useBreakpointIndex'

const useResponsiveValue = values => {
  const { theme } = useThemeUI()
  const array = typeof values === 'function' ? values(theme) : values
  return array[useBreakpointIndex()]
}

export default useResponsiveValue
