/** @jsx jsx */
import { jsx, Themed } from 'theme-ui'

const Content = () => (
  <article
    sx={{
      fontFamily: 'body',
      lineHeight: 'body',
      color: 'text',
      maxWidth: 768,
      px: 2,
      py: 4,
      mx: 'auto',
    }}
  >
    <h1
      sx={{
        fontSize: [4, 5, 6],
        mb: 0,
      }}
    >
      Custom JSX pragma example
    </h1>
    <p>
      This page uses the Theme UI <Themed.code>sx</Themed.code> prop with a
      custom JSX pragma that allows you to use theme-based values directly in
      the <Themed.code>sx</Themed.code> prop with no additional imports. You can
      also use arrays as values to apply responsive styles to any CSS property.
    </p>
  </article>
)

export default Content
