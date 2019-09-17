/** @jsx jsx */
import React, { useEffect, useReducer, useState } from 'react'
import { ThemeContext as EmotionContext } from '@emotion/core'
import { version as emotionVersion } from '@emotion/core/package.json'
import { MDXProvider } from '@mdx-js/react'
import { get } from '@styled-system/css'
import merge from './merge'
import jsx from './jsx'
import { Context, useThemeUI } from './context'
import { useColorState } from './color-modes'
import { createComponents } from './components'
import { toCustomProperties } from './custom-properties'

const mergeState = (state = {}, next) => merge.all({}, state, next)

const applyColorMode = (theme, mode) => {
  if (!mode) return theme
  const modes = get(theme, 'colors.modes', {})
  return merge.all({}, theme, {
    colors: get(modes, mode, {}),
  })
}

const BaseProvider = ({ context, components, children }) => {
  const theme = { ...context.theme }
  if (theme.useCustomProperties) {
    theme.colors = toCustomProperties(theme.colors, 'colors')
  }
  return jsx(
    EmotionContext.Provider,
    { value: theme },
    jsx(
      MDXProvider,
      { components },
      jsx(Context.Provider, { value: context, children })
    )
  )
}

const RootProvider = ({ theme: propsTheme = {}, components, children }) => {
  // components are provided in the default Context
  const outer = useThemeUI()
  const [colorMode, setColorMode] = useColorState(outer.theme || propsTheme)

  const theme = applyColorMode(outer.theme || propsTheme, colorMode)

  const context = {
    ...outer,
    __THEME_UI__: true,
    colorMode,
    setColorMode,
    components: { ...outer.components, ...createComponents(components) },
    theme,
  }

  useEffect(() => {
    window.__THEME_UI__ = context
  }, [context.theme, context.colorMode])

  return jsx(BaseProvider, {
    context,
    components: context.components,
    children,
  })
}

const NestedProvider = ({ theme, components, children }) => {
  const outer = useThemeUI()
  const context = merge.all({}, outer, { theme })

  return jsx(BaseProvider, {
    context,
    components: createComponents(components),
    children,
  })
}

export const ThemeProvider = props => {
  const outer = useThemeUI()

  if (process.env !== 'production') {
    if (outer.emotionVersion !== emotionVersion) {
      console.warn(
        'Multiple versions of Emotion detected,',
        'and theming might not work as expected.',
        'Please ensure there is only one copy of @emotion/core installed in your application.'
      )
    }
  }

  if (!props.scoped && outer.__THEME_UI__) {
    return jsx(NestedProvider, props)
  }
  return jsx(RootProvider, props)
}

let useDevEditor = () => {}

if (process.env.NODE_ENV !== 'production') {
  const { createPortal } = require('react-dom')

  useDevEditor = context => {
    const [div, setDiv] = useState(null)
    const { editor } = context
    useEffect(() => {
      const el = document.body.appendChild(document.createElement('div'))
      console.log('el', el)
      setDiv(el)
    }, [])
    if (!div) return
    console.log('render portal', editor)
    const selected = editor && editor.elements[editor.selected]
    return createPortal(
      <div
        sx={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          margin: 1,
          p: 1,
          color: 'white',
          bg: 'black',
        }}>
        <pre>hello {JSON.stringify(selected)}</pre>
      </div>,
      div
    )
  }
}

export const ThemeStateProvider = ({ theme, children }) => {
  const outer = useThemeUI()
  const [state, setTheme] = useReducer(mergeState, theme)
  const [selected, select] = useState(null)
  const [elements, setElements] = useState({})
  const register = (id, data) => {
    setElements({
      ...elements,
      [id]: data,
    })
  }

  const context = {
    ...outer,
    theme: state,
    setTheme,
    editor: {
      selected,
      select,
      elements,
      register,
    },
  }
  const editor = useDevEditor(context)
  console.log('editor', context.editor.selected, context.editor.elements)

  return jsx(
    Context.Provider,
    {
      value: context,
    },
    ...React.Children.toArray(children),
    editor
  )
}
