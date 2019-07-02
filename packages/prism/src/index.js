/** @jsx jsx */
/* eslint react/jsx-key: 0 */

import Highlight, { defaultProps } from 'prism-react-renderer'
import { jsx, useThemeUI } from 'theme-ui'

export default ({ children, className, title }) => {
  const { theme = {} } = useThemeUI()
  const { styles: { pre = {} } = {} } = theme

  const [language] = className.replace(/language-/, '').split(' ')

  return (
    <Highlight
      {...defaultProps}
      code={children.trim()}
      language={language}
      theme={undefined}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} sx={{ ...style, ...pre }}>
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
  )
}
