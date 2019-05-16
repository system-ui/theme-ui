import { createContext, useContext } from 'react'
import { components } from './components'

export const Context = createContext({
  theme: {},
  components,
})

export const useThemeUI = () => useContext(Context)
