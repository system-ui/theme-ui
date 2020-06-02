import { jsx } from 'theme-ui'
import Posts from '../../posts'

export default (props) => {
  const posts = props.data.allBlogPost.edges.map((e) => e.node)

  return jsx(Posts, {
    ...props,
    posts,
  })
}
