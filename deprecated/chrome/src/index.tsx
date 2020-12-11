/** @jsx jsx */
import { jsx } from 'theme-ui'
import {
  useReducer,
  useEffect,
  useRef,
  useState,
  FunctionComponent,
} from 'react'
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
  // @ts-ignore
} from '@theme-ui/editor'
import { Theme } from '@theme-ui/css'

interface DevToolsExceptionInfo {
  isError: boolean
  code: string
  description: string
  details: any[]
  isException: boolean
  value: string
}

const runScript = (script: string) =>
  new Promise((resolve, reject) => {
    debounce(window.chrome.devtools.inspectedWindow.eval, 100)(
      script,
      (result: object, err: DevToolsExceptionInfo) => {
        if (err) {
          console.error(err)
          reject(err)
        }
        resolve(result)
      }
    )
  })

type StateWithColorMode = { colorMode?: string; theme?: Theme }
const mergeState = (state: StateWithColorMode, next: StateWithColorMode) =>
  merge({}, state, next)

const CopyTheme = ({ theme }: { theme: Theme }) => {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)

  const handleClick = () => {
    setCopied(true)
    copyToClipboard(JSON.stringify(theme))
    clearInterval(timer.current)
    timer.current = window.setInterval(() => setCopied(false), 1000)
  }

  return (
    <button onClick={handleClick}>{copied ? 'Copied!' : 'Copy theme'}</button>
  )
}

const Spacer = () => <div sx={{ my: 2 }} />

const App: FunctionComponent = () => {
  const dark = window.chrome.devtools.panels.themeName === 'dark'

  const [state, setState] = useReducer(mergeState, {})

  const getTheme = () => {
    runScript(`window.__THEME_UI__.theme`).then(resolvedTheme => {
      const theme = resolvedTheme as StateWithColorMode['theme']
      setState({ theme })
    })
  }

  const getColorMode = () => {
    runScript(`window.__THEME_UI__.colorMode`).then(resolvedColorMode => {
      const colorMode = resolvedColorMode as StateWithColorMode['colorMode']
      setState({ colorMode })
    })
  }

  const setTheme = (nextTheme: Theme) => {
    const json = JSON.stringify(nextTheme)
    runScript(`window.__THEME_UI__.setTheme(${json})`)
    setState({ theme: nextTheme })
  }

  const setColorMode = (nextMode: Theme['initialColorModeName']) => {
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

  if (!context.theme) return null

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
      <CopyTheme theme={context.theme} />
    </Editor>
  )
}

render(<App />, document.getElementById('root'))
