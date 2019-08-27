import React, { useReducer, useEffect } from 'react'
import { Global } from '@emotion/core'
import { render } from 'react-dom'
import merge from 'lodash.merge'
import debounce from 'lodash.debounce'
import { ThemeProvider, Styled, ColorMode } from 'theme-ui'
import { theme, Panel } from '@theme-ui/editor'

const runScript = script => {
  return new Promise((resolve, reject) => {
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
}

const mergeState = (state, next) => merge({}, state, next)

const Editor = () => {
  const panelColorMode =
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
            'html,body': {
              margin: 0,
            },
          }}
        />
        {state.theme && (
          <Panel
            panelColorMode={panelColorMode}
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
