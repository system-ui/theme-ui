/** @jsx jsx */
/* eslint react/jsx-key: 0 */

import { Fragment } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { jsx, useThemeUI } from 'theme-ui'

export default ({ children, className, title }) => {
  const { theme = {} } = useThemeUI()
  const { styles: { pre = {}, codeTitle = {}, prism } = {} } = theme
  const prismTheme = prism ? prism : defaultProps.theme

  const [language] = className.replace(/language-/, '').split(' ')

  const extraStyles = title ? { marginTop: 0 } : {}

  return (
    <Fragment>
      {title ? <div sx={codeTitle}>{title}</div> : null}
      <Highlight
        {...defaultProps}
        code={children.trim()}
        language={language}
        theme={prismTheme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} sx={{ ...style, ...pre, ...extraStyles }}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </Fragment>
  )
}
