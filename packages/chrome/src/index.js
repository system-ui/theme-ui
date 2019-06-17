import React, {
  useReducer,
  useEffect,
} from 'react'
import { render } from 'react-dom'

const div = document.getElementById('root')

if (chrome.devtools.panels.themeName === 'dark') {
  document.body.style = '--text:white;--background:black;'
}

const mergeReducer = (state, next) => typeof next === 'function' ? Object.assign({}, state, next(state)) : Object.assign({}, state, next)

const runScript = (script) => {
  return new Promise((resolve, reject) => {
    chrome.devtools.inspectedWindow.eval(
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

const App = props => {
  const [ state, setState ] = useReducer(mergeReducer, {
    theme: null,
  })

  const getTheme = () => {
    runScript(`window.__THEME_UI__.theme`)
      .then(theme => {
        if (!theme) return console.log('no theme!!', theme)
        setState({ theme })
      })
  }

  const setTheme = (next) => {
    const json = JSON.stringify(next)
    runScript(`window.__THEME_UI__.setTheme(${json})`)
      .then(getTheme)
  }

  useEffect(() => {
    getTheme()
  }, [])

  return (
    <div>
      <pre>theme-ui</pre>
      <button
        onClick={e => {
          setTheme({ colors: { background: 'tomato' } })
        }}>
        Tomato
      </button>
      <pre>{JSON.stringify(state.theme, null, 2)}</pre>
    </div>
  )
}

render(<App />, div)

// Notes
//
// callback for when element selection changes
// chrome.devtools.panels.elements.onSelectionChanged.addListener(updateSelection)
