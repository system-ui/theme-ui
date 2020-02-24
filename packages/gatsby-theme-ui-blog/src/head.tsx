import React from 'react'
import { Helmet } from 'react-helmet'

export interface HeadProps {
  lang?: string
  title?: string
  excerpt?: string
}

const Head: React.FC<HeadProps> = ({
  lang = 'en-us',
  title,
  excerpt,
  ...props
}) => (
  <Helmet
    {...props}
    htmlAttributes={{
      lang,
    }}>
    {title && <title>{title}</title>}
    {excerpt && <meta name="description" content={excerpt} />}
  </Helmet>
)

export default Head
