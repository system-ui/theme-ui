import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Recipe from './recipe'

export const query = graphql`
  query($id: String!) {
    recipe: mdxRecipe(id: { eq: $id }) {
      id
      name
      slug
      body
      snippets
    }
  }
`

export default function Query(props) {
  const { name, slug, id, body, snippets } = props.data.recipe

  const children = <MDXRenderer children={body} />

  return React.createElement(Recipe, {
    ...props,
    name,
    slug,
    id,
    body,
    snippets,
    children,
  })
}
