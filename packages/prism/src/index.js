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
          sx={style}>
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
