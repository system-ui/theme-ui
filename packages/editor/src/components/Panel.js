/** @jsx jsx */
import { useEffect } from 'react'
import { jsx, useColorMode } from 'theme-ui'

import Colors from './Colors'
import Modes from './Modes'
import Typography from './Typography'
import CopyThemeToClipboard from './CopyThemeToClipboard'

const Panel = ({ state, setColorMode, setTheme, panelColorMode }) => {
  const setPanelColorMode = useColorMode()[1]

  useEffect(() => {
    setPanelColorMode(panelColorMode)
  }, [])

  return (
    <div sx={{ p: 4, maxWidth: 400 }}>
      <header>
        <h1
          sx={{
            fontSize: 5,
            mt: 0,
            mb: 4,
          }}
        >
          Theme UI Devtools
        </h1>
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
