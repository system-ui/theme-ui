/** @jsx jsx */
/* eslint react/jsx-key: 0 */

import Highlight, { defaultProps } from 'prism-react-renderer'
import { jsx, Styled } from 'theme-ui'

import Prism from 'prismjs/components/prism-core'

import {
  colors,
  fontSizes as fontSizeTokens,
  space as spaceTokens,
} from 'gatsby-design-tokens'

const fontSizes = fontSizeTokens.map(token => `${token / 16}rem`)
const space = spaceTokens.map(token => `${token / 16}rem`)

export default ({ children, className: outerClassName, title = ``, prism }) => {
  const [language] = outerClassName.replace(/language-/, '').split(' ')

  return (
    <Highlight
      {...defaultProps}
      Prism={prism || Prism}
      code={children.trim()}
      language={language}
      theme={undefined}>
      {title && (
        <div
          sx={{
            background: colors.code.bg,
            borderBottom: `1px solid ${colors.code.border}`,
            color: colors.code.text,
            padding: `${space[5]} ${space[6]} ${space[4]}`,
            fontSize: fontSizes[0],
          }}>
          <div sx={{ fontSize: fontSizes[0] }}>{title}</div>
        </div>
      )}
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
