/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import { Styled } from '@theme-ui/mdx'
import { Link } from 'gatsby'
import { Layout } from 'gatsby-theme-ui-layout'
import { PostNode } from './gatsby-theme-blog-core/components/posts'

interface PostsProps {
  posts: PostNode[]
}

const Posts: React.FC<PostsProps> = ({ posts, ...props }) => (
  <Styled.root>
    <Layout {...props}>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  </Styled.root>
)

export default Posts
