import React, {
  useReducer,
  useEffect,
} from 'react'
import { render } from 'react-dom'
import merge from 'lodash.merge'
import debounce from 'lodash.debounce'
import Form from './form'

const div = document.getElementById('root')

if (chrome.devtools.panels.themeName === 'dark') {
  // todo: use standard/default styles
  document.body.style = '--text:white;--background:black;'
}

const mergeState = (state, next) => merge({}, state, next)

const runScript = (script) => {
  return new Promise((resolve, reject) => {
    debounce(chrome.devtools.inspectedWindow.eval, 100)(
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
  const [ state, setState ] = useReducer(mergeState, {
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
    setState({ theme: next })
  }

  useEffect(() => {
    getTheme()
  }, [])

  console.log(state)

  return (
    <div>
      <pre>theme-ui</pre>
      <Form
        {...state}
        setTheme={setTheme}
      />
      <pre>{JSON.stringify(state.theme, null, 2)}</pre>
    </div>
  )
}

render(<App />, div)

// Notes
//
// callback for when element selection changes
// chrome.devtools.panels.elements.onSelectionChanged.addListener(updateSelection)
