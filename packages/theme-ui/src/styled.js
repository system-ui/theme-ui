import { forwardRef, useContext } from 'react'
import { ThemeContext } from '@emotion/core'
import isPropValid from '@emotion/is-prop-valid'
import jsx from './jsx'

export const styled = tag => (...args) => {
  // should this use should-forward-prop?
  const Styled = forwardRef(
    (
      {
        as,
        // these should only be applied when the outer element uses theme-ui jsx pragma
        css,
        sx,
        ...props
      },
      ref
    ) => {
      const theme = useContext(ThemeContext)
      let nextProps = {}
      let styles = {}
      args.forEach(arg => {
        const style = typeof arg === 'function' ? arg({ theme, ...props }) : arg
        Object.assign(styles, style)
      })
      for (let key in props) {
        if (!isPropValid(key)) continue
        nextProps[key] = props[key]
      }

      return jsx(as || tag, {
        ...nextProps,
        css: styles,
      })
    }
  )
  return Styled
}

export default styled
