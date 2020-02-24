import { jsx } from 'theme-ui'
import Posts from '../../posts'

export interface PostNode {
  id: string
  excerpt: string
  slug: string
  title: string
  date: string
  tags: string[]
}

interface AllBlogPost {
  edges: {
    node: PostNode
  }[]
}

interface Props {
  data: {
    allBlogPost: AllBlogPost
  }
}

export default (props: Props) => {
  const posts = props.data.allBlogPost.edges.map(e => e.node)

  return jsx(Posts, {
    ...props,
    posts,
  })
}
