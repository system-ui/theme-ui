import { Button, useColorMode } from 'theme-ui'

const Header = () => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <header>
      <Button
        onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}
      >
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </header>
  )
}

export default Header
