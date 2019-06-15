import {
  createContext,
  useContext,
} from 'react'
import { base } from '@theme-ui/presets'
import Card from './Card'

const context = {
  ...base,
  components: {
    Card,
  }
}

export const Context = createContext(context)
export const useTheme = () => useContext(Context)
