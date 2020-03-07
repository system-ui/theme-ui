import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { RecipeQuery } from '../types'
import Recipe from './recipe'

export const query = graphql`
  query recipeQuery($id: String!) {
    recipe: mdxRecipe(id: { eq: $id }) {
      id
      name
      slug
      body
      snippets
    }
  }
`

export default (props: { data: { recipe: RecipeQuery } }) => {
  const { name, slug, id, body, snippets } = props.data.recipe

  return (
    <Recipe name={name} slug={slug} id={id} snippets={snippets}>
      <MDXRenderer children={body} />
    </Recipe>
  )
}
