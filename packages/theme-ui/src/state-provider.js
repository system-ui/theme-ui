import {
  createElement as jsx,
  createContext,
  useReducer,
  useContext,
} from 'react'
import merge from 'lodash.merge'

/*
 * - [ ] state
 * - [ ] merge outer context
 * - [ ] hoist up to outer state
 */

const Context = createContext({})

const reducer = (state, next) => merge({}, state, next)

const useState = (init) => {
  const outer = useContext(Context)
  const [ state, setState ] = useReducer(reducer, init)
}

const Provider = props => {
  const outer = useContext(Context)
  const [ state, setState ] = useReducer(reducer, {})

  console.log(outer, state)

  return jsx(Context.Provider, { value: context },
    props.children
  )
}
