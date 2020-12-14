/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Layout } from 'gatsby-theme-ui-layout'

export default ({
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
