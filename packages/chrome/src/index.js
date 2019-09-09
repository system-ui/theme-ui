/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useReducer, useEffect, useRef, useState } from 'react'
import { render } from 'react-dom'
import debounce from 'lodash.debounce'
import merge from 'lodash.merge'
import copyToClipboard from 'copy-to-clipboard'
import {
  Editor,
  Row,
  ColorPalette,
  ColorMode,
  Fonts,
  FontWeights,
  LineHeights,
  FontSizes,
  Space,
} from '@theme-ui/editor'

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

const Spacer = () => <div sx={{ my: 2 }} />

const App = () => {
  const dark = window.chrome.devtools.panels.themeName === 'dark'

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
    setState({ colorMode: nextMode })
    runScript(`window.__THEME_UI__.setColorMode('${nextMode}')`)
  }

  useEffect(() => {
    getColorMode()
  }, [])

  useEffect(() => {
    getTheme()
  }, [state.colorMode])

  const context = {
    ...state,
    setTheme,
    setColorMode,
  }

  if (!context.theme) return false

  return (
    <Editor
      context={context}
      sx={{
        px: 2,
        py: 4,
        fontSize: 12,
        color: dark ? 'white' : 'black',
      }}>
      <ColorPalette size={64} />
      {context.colorMode && <ColorMode />}
      <Spacer />
      <b>Fonts</b>
      <Row width={192}>
        <Fonts />
      </Row>
      <Spacer />
      <b>Font Weights</b>
      <Row>
        <FontWeights />
      </Row>
      <Spacer />
      <b>Line Heights</b>
      <Row>
        <LineHeights />
      </Row>
      <Spacer />
      <b>Font Sizes</b>
      <Row>
        <FontSizes />
      </Row>
      <Spacer />
      <b>Space</b>
      <Row>
        <Space />
      </Row>
      <Spacer />
      <CopyTheme theme={state.theme} />
    </Editor>
  )
}

render(<App />, document.getElementById('root'))
