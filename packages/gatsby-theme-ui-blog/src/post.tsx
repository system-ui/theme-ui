/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import { Styled } from '@theme-ui/mdx'
import { Layout } from 'gatsby-theme-ui-layout'

interface PostProps {
  title?: string
  date?: string
  excerpt?: string
  keywords?: string[]
  tags?: string[]
}

const Post: React.FC<PostProps> = ({
  title,
  date,
  excerpt,
  children,
  keywords,
  tags,
  ...props
}) => (
  <Styled.root>
    <Layout title={title} excerpt={excerpt} {...props}>
      <Styled.h1>{title}</Styled.h1>
      <div>{date}</div>
      {children}
    </Layout>
  </Styled.root>
)

export default Post
