/** @jsxImportSource theme-ui */
import { Themed } from 'theme-ui'

const Layout = (props) => (
  <Themed.root>
    <header>
      <h2>Theme UI Gatsby Example</h2>
    </header>
    <main>
      <div sx={{ fontFamily: 'body' }}>{props.children}</div>
    </main>
  </Themed.root>
)

export default Layout
