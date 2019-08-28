// import { useContext } from 'react'
// import { ThemeContext } from '@emotion/core'
// export const useTheme = () => useContext(ThemeContext)

import { useThemeUI } from 'theme-ui'
export const useTheme = () => useThemeUI().theme
