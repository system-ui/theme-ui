// @ts-check
import { Themed } from '@theme-ui/mdx'
import { graphql, Link } from 'gatsby'

import { Cards } from '../..'

export const query = graphql`
  {
    allSitePage(filter: { path: { glob: "/recipes/*" } }) {
      nodes {
        id
        path
        pageContext
      }
    }
  }
`

const RecipeListItem = ({ id, pageContext, path }) => {
  const {
    frontmatter: { name },
  } = pageContext

  return (
    <Themed.li>
      {/* TODO: Cards with rendered recipes would be cool, but we'll need
          some tests for them first.
          Check out commit 67e112cb547f93e6b30a09d03e218e335742be76 for preview
          card implementation.  */}
      <Link to={path}>{name}</Link>
    </Themed.li>
  )
}

export default function RecipesPage(props) {
  const recipes = props.data.allSitePage.nodes

  return (
    <div sx={{}}>
      <Themed.h1>Recipes</Themed.h1>
      <Cards columns={2}>
        <Themed.ul>
          {recipes.map((recipe) => (
            <RecipeListItem key={recipe.id} {...recipe} />
          ))}
        </Themed.ul>
      </Cards>
    </div>
  )
}
