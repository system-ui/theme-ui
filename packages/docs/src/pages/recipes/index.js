/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql, Link } from 'gatsby'
import { LiveCode } from '../../components/code'

export const query = graphql`
  query {
    recipes: allMdxRecipe {
      nodes {
        id
        name
        slug
        snippets
      }
    }
  }
`

const Card = ({ name, slug, snippets }) => {
  const [first] = snippets
  if (!first) return false
  const { value, props } = first

  return (
    <Link
      to={slug}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 192,
        color: 'inherit',
        bg: 'muted',
        textDecoration: 'none',
        p: 2,
        borderRadius: 4,
        boxShadow: t => `0 0 3px ${t.colors.darken}`,
        ':hover': {
          boxShadow: t => `0 0 8px 1px ${t.colors.darken}`,
        },
      }}>
      {props.live && (
        <div
          sx={{
            zoom: 1 / 2,
            // flex: '1 1 auto',
            my: 'auto',
            bg: 'background',
            overflow: 'hidden',
          }}>
          <LiveCode preview children={value} />
        </div>
      )}
      <div
        sx={{
          fontWeight: 'bold',
          fontSize: 0,
          mt: 2,
        }}>
        {name}
      </div>
    </Link>
  )
}

export default props => {
  const recipes = props.data.recipes.nodes

  return (
    <div sx={{}}>
      <Styled.h1>Recipes</Styled.h1>
      <ul
        sx={{
          listStyle: 'none',
          p: 0,
          m: 0,
          display: 'grid',
          gridGap: 4,
          gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))',
        }}>
        {recipes.map(r => (
          <li key={r.id}>
            <Card {...r} />
          </li>
        ))}
      </ul>
    </div>
  )
}
