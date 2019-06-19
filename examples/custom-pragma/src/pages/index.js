/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

export default props => (
  <div
    css={{
      fontFamily: 'body',
      lineHeight: 'body',
      color: 'text',
      bg: 'background',
      maxWidth: 768,
      px: 4,
      mx: 'auto',
    }}
  >
    <h1
      css={{
        fontSize: [4, 5, 6],
      }}
    >
      Custom JSX pragma example
    </h1>
    <p>
      This page uses the Theme UI <Styled.code>css</Styled.code> prop with a
      custom JSX pragma that allows you to use theme-based values directly in
      the <Styled.code>css</Styled.code> prop with no additional imports. You
      can also use arrays as values to apply responsive styles to any CSS
      property.
    </p>
  </div>
)
