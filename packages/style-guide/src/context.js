import { useContext } from 'react'
import { ThemeContext } from '@emotion/core'

export const useThemeUI = () => useContext(ThemeContext)
