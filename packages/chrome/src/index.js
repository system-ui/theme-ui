/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useReducer, useEffect, useRef, useState } from 'react'
import { Global } from '@emotion/core'
import { render } from 'react-dom'
import merge from 'lodash.merge'
import debounce from 'lodash.debounce'
import copyToClipboard from 'copy-to-clipboard'
import { ThemeProvider, Styled, ColorMode, useColorMode } from 'theme-ui'
import theme from './theme'
import { Colors, Modes, Typography } from '@theme-ui/editor'

const runScript = script =>
  new Promise((resolve, reject) => {
    debounce(window.chrome.devtools.inspectedWindow.eval, 100)(
      script,
      (result, err) => {
        if (err) {
          console.error(err)
          reject(err)
        }
        resolve(result)
      }
    )
  })

const mergeState = (state, next) => merge({}, state, next)

const CopyTheme = ({ theme }) => {
  const [copied, setCopied] = useState(false)
  const timer = useRef(false)

  const handleClick = () => {
    setCopied(true)
    copyToClipboard(JSON.stringify(theme))
    clearInterval(timer.current)
    timer.current = setInterval(() => setCopied(false), 1000)
  }

  return (
    <button onClick={handleClick}>{copied ? 'Copied!' : 'Copy theme'}</button>
  )
}

const Panel = ({ state, setColorMode, setTheme }) => (
  <div sx={{ p: 4, maxWidth: 400 }}>
    <header>
      <h1
        sx={{
          fontSize: 5,
          mt: 0,
          mb: 4,
        }}>
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
      <CopyTheme theme={state.theme} />
    </footer>
  </div>
)

const Editor = () => {
  theme.colorMode =
    window.chrome.devtools.panels.themeName === 'dark' ? 'dark' : 'light'

  const [state, setState] = useReducer(mergeState, {
    theme: null,
    colorMode: null,
  })

  const getTheme = () => {
    runScript(`window.__THEME_UI__.theme`).then(theme => {
      setState({ theme })
    })
  }

  const getColorMode = () => {
    runScript(`window.__THEME_UI__.colorMode`).then(colorMode => {
      setState({ colorMode })
    })
  }

  const setTheme = nextTheme => {
    const json = JSON.stringify(nextTheme)
    runScript(`window.__THEME_UI__.setTheme(${json})`)
    setState({ theme: nextTheme })
  }

  const setColorMode = nextMode => {
    runScript(`window.__THEME_UI__.setColorMode('${nextMode}')`)
  }

  useEffect(() => {
    getTheme()
    getColorMode()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Styled.root>
        <ColorMode />
        <Global
          styles={{
            body: {
              margin: 0,
            },
          }}
        />
        {state.theme && (
          <Panel
            state={state}
            setTheme={setTheme}
            setColorMode={setColorMode}
          />
        )}
      </Styled.root>
    </ThemeProvider>
  )
}

render(<Editor />, document.getElementById('root'))
