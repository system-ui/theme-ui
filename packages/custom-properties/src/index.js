import React, { useContext, useState, useEffect } from 'react'
import { ThemeContext, Global } from '@emotion/core'

// - [ ] OR hook into theme-ui context??

const flatten = (obj, parent, mode) => {
  const result = []
  for (const key in obj) {
    const name = [parent, key].filter(Boolean).join('.')
    const value = obj[key]

    if (key === 'styles') continue

    if (value && typeof value === 'object') {
      if (parent === 'colors.modes') {
        result.push(...flatten(value, 'colors', key))
      } else {
        result.push(...flatten(value, name))
      }
      continue
    }

    result.push({
      mode,
      name,
      value,
    })
  }
  return result
}

const toVarName = str => `--${str.replace(/\./g, '-')}`

const createStyles = theme => {
  const vars = flatten(theme)
  const styles = {
    body: {
      color: 'var(--colors-text)',
      backgroundColor: 'var(--colors-background)',
    },
  }
  vars.forEach(({ name, value, mode }) => {
    const varName = toVarName(name)
    if (mode) {
      const key = `&.${mode}`
      styles.body[key] = styles.body[key] || {}
      styles.body[key][varName] = value
    } else {
      styles.body[varName] = value
    }
  })
  return styles
}

const themeToVars = (obj, parent) => {
  const next = {}
  for (const key in obj) {
    const name = [parent, key].filter(Boolean).join('.')
    const value = obj[key]
    if (key === 'modes') continue
    if (key === 'styles') {
      next.styles = value
      continue
    }

    if (value && typeof value === 'object') {
      next[key] = themeToVars(value, name)
      continue
    }

    next[key] = `var(${toVarName(name)}, ${value})`
  }

  return next
}

const getModes = obj => {
  return [
    obj.initialColorMode,
    ...Object.keys((obj.colors && obj.colors.modes) || {}),
  ].filter(Boolean)
}

export const useTheme = () => useContext(ThemeContext)

export const CustomPropertiesProvider = ({ theme, children }) => {
  const outer = useTheme()
  const merged = { ...outer, ...theme }
  const [colorMode, setColorMode] = useState(merged.initialColorMode)
  const modes = getModes(merged)

  useEffect(() => {
    document.body.classList.remove(...modes)
    document.body.classList.add(colorMode)
  }, [colorMode])

  const styles = createStyles(merged)
  const context = themeToVars(merged)
  context.colorMode = colorMode
  context.setColorMode = setColorMode
  context.cycleColorMode = () => {
    const i = modes.indexOf(colorMode)
    const n = (i + 1) % modes.length
    setColorMode(modes[n])
  }

  return (
    <ThemeContext.Provider value={context}>
      <Global styles={styles} />
      <button
        onClick={e => {
          context.cycleColorMode()
          // setColorMode(colorMode === 'light' ? 'dark' : 'light')
        }}
      >
        {colorMode}
      </button>
      {children}
    </ThemeContext.Provider>
  )
}
