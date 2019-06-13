import React, {
  useReducer,
  useEffect,
} from 'react'
import { render } from 'react-dom'

const div = document.getElementById('root')

if (chrome.devtools.panels.themeName === 'dark') {
  console.log('dark devtools')
  document.body.style = '--text:white;--background:black;'
}

const mergeReducer = (state, next) => typeof next === 'function' ? Object.assign({}, state, next(state)) : Object.assign({}, state, next)

const App = props => {
  const [ state, setState ] = useReducer(mergeReducer, {
    hook: null,
    theme: null,
    selected: null,
  })

  useEffect(() => {
    chrome.devtools.inspectedWindow.eval('window.__REACT_DEVTOOLS_GLOBAL_HOOK__.$0 = $0')

    chrome.devtools.inspectedWindow.eval(
      'window.__REACT_DEVTOOLS_GLOBAL_HOOK__', {},
      function (hook, e) {
        if (e) return console.error(e)
        console.log('hook', hook)
        setState({ hook })
      }
    )

    chrome.devtools.inspectedWindow.eval(
      'window.__THEME_UI__.theme',
      // { useContentScriptContextOptional: true, },
      function (theme, e) {
        if (e) return console.error(e)
        setState({ theme })
      }
    )
  }, [])


  return (
    <div>
      theme-ui
      <pre>
        {typeof state.hook}
        {Object.keys(state.hook || {})}
      </pre>
      <pre>{JSON.stringify(state.theme, null, 2)}</pre>
    </div>
  )
}

render(<App />, div)
