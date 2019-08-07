import React from 'react'
import { useColorMode } from 'theme-ui'

export default function Header() {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <header>
      <button
        onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </button>
    </header>
  )
}
