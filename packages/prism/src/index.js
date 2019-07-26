/** @jsx jsx */
/* eslint react/jsx-key: 0 */

import Highlight, { defaultProps } from 'prism-react-renderer'
import { jsx, Styled } from 'theme-ui'

const aliases = {
  js: 'javascript',
  sh: 'bash',
}

export default ({ children, className: outerClassName, title, ...props }) => {
  const [language] = outerClassName.replace(/language-/, '').split(' ')
  const lang = aliases[language] || language

  return (
    <Highlight
      {...defaultProps}
      {...props}
      code={children.trim()}
      language={lang}
      theme={undefined}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Styled.pre className={`${outerClassName} ${className}`} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span
                  {...getTokenProps({ token, key })}
                  sx={{ display: 'inline-block' }}
                />
              ))}
            </div>
          ))}
        </Styled.pre>
      )}
    </Highlight>
  )
}
