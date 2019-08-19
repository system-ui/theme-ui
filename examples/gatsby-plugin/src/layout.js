/** @jsx jsx */
import { jsx } from 'theme-ui'

export default props => (
  <div>
    <header>
      <h2>Theme UI Gatsby Example</h2>
    </header>
    <main>
      <div sx={{ fontFamily: 'body' }}>{props.children}</div>
    </main>
  </div>
)
