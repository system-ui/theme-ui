/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Link } from 'gatsby'

export default props => (
  <div>
    <div
      sx={{
        fontWeight: 'bold',
        mb: 3,
      }}>
      <Styled.a as={Link} to="/recipes">
        Recipes
      </Styled.a>
      {' / '}
      <span>{props.name}</span>
    </div>
    {props.children}
  </div>
)
