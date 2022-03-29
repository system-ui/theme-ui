/** @jsx jsx */
import { BaseStyles, jsx } from 'theme-ui'

const Layout = (props) => (
  <BaseStyles>
    <article
      sx={{
        maxWidth: 768,
        px: 2,
        py: 4,
        mx: 'auto',
      }}
    >
      {props.children}
    </article>
  </BaseStyles>
)

export default Layout
