/** @jsx jsx */
/* eslint react/jsx-key: 0 */

import Highlight, { defaultProps } from 'prism-react-renderer'
import { jsx, Styled } from 'theme-ui'

export default ({ children, className, title }) => {
  const [language] = className.replace(/language-/, '').split(' ')

  return (
    <Highlight
      {...defaultProps}
      code={children.trim()}
      language={language}
      theme={undefined}>
      {({
        className: innerClassName,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => (
        <Styled.pre
          className={[className, innerClassName].join(' ')}
          style={style}>
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
