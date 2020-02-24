import { jsx } from 'theme-ui'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Post from '../../post'

interface BlogPost {
  id: string
  excerpt: string
  body: string
  slug: string
  title: string
  date: string
  tags: string[]
  keywords: string[]
}

interface Props {
  data: {
    blogPost: BlogPost
  }
}

export default (props: Props) => {
  const { body } = props.data.blogPost
  const children = jsx(MDXRenderer, { children: body })

  return jsx(Post, {
    ...props,
    ...props.data.blogPost,
    children,
  })
}
