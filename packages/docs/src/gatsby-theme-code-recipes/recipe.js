/** @jsx jsx */
import { jsx, Themed } from 'theme-ui'
import { Link } from 'gatsby'

export default (props) => (
  <div>
    <div
      sx={{
        fontWeight: 'bold',
        mb: 3,
      }}>
      <Themed.a as={Link} to="/recipes">
        Recipes
      </Themed.a>
      {' / '}
      <span>{props.name}</span>
    </div>
    {props.children}
  </div>
)
