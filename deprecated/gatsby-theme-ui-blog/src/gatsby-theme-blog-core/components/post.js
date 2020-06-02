import { jsx } from 'theme-ui'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Post from '../../post'

export default (props) => {
  const { body } = props.data.blogPost
  const children = jsx(MDXRenderer, { children: body })

  return jsx(Post, {
    ...props,
    ...props.data.blogPost,
    children,
  })
}
