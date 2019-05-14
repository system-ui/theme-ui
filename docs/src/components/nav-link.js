/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'

const styles = {
  display: 'inline-block',
  px: 2,
  py: 3,
  color: 'inherit',
  textDecoration: 'none',
  fontWeight: 'bold',
}

export default props => !!props.to ? (
  <Link {...props} css={styles} />
) : (
  <a {...props} css={styles} />
)
