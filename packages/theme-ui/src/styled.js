import { forwardRef, useContext } from 'react'
import { ThemeContext } from '@emotion/core'
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
      let styles = {}
      args.forEach(arg => {
        const style = typeof arg === 'function' ? arg({ theme, ...props }) : arg
        Object.assign(styles, style)
      })

      return jsx(as || tag, {
        ...props,
        css: styles,
      })
    }
  )
  return Styled
}

export default styled
