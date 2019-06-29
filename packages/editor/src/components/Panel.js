/** @jsx jsx */
import { useEffect } from 'react'
import { jsx, useColorMode } from 'theme-ui'

import { Heading } from './Typography'
import Colors from './Panel/Colors'
import Modes from './Panel/Modes'
import Typography from './Panel/Typography'
import CopyThemeToClipboard from './CopyThemeToClipboard'

const Panel = ({ state, setColorMode, setTheme }) => {
  const [panelColorMode, setPanelColorMode] = useColorMode()

  useEffect(() => {
    if (window.chrome.devtools.panels.themeName === 'dark') {
      setPanelColorMode('dark')
    } else {
      setPanelColorMode('light')
    }
  }, [])

  return (
    <div sx={{ p: 4, maxWidth: 400 }}>
      <header>
        <Heading
          level={1}
          sx={{
            fontSize: 5,
            mt: 0,
            mb: 4,
          }}
        >
          Theme UI Devtools
        </Heading>
      </header>
      <main>
        <Colors theme={state.theme} setTheme={setTheme} />
        {state.colorMode && (
          <Modes
            theme={state.theme}
            colorMode={state.colorMode}
            setColorMode={setColorMode}
          />
        )}
        <Typography theme={state.theme} setTheme={setTheme} />
      </main>
      <footer>
        <CopyThemeToClipboard theme={state.theme} />
      </footer>
    </div>
  )
}

export default Panel
