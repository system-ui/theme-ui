/** @jsx jsx */
/* eslint react/jsx-key: 0 */

import Highlight, { defaultProps } from 'prism-react-renderer'
import { jsx, Styled } from 'theme-ui'

export default ({ children, className: outerClassName, title }) => {
  const [language] = outerClassName.replace(/language-/, '').split(' ')

  return (
    <Highlight
      {...defaultProps}
      code={children.trim()}
      language={language}
      theme={undefined}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Styled.pre className={`${outerClassName} ${className}`} sx={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Styled.pre>
      )}
    </Highlight>
  )
}
