import React from 'react'
import { Helmet } from 'react-helmet'
import pkg from 'theme-ui/package.json'

export default props => {
  const title = [
    props.title,
    props._frontmatter ? props._frontmatter.title : false,
    'Theme UI',
  ]
    .filter(Boolean)
    .join(' — ')

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={pkg.description} />
      <link rel="icon" type="image/png" href="/icon.png" />
      <link rel="apple-touch-icon" type="image/png" href="/icon.png" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@jxnblk" />
      <meta name="twitter:image" content="https://theme-ui.com/icon.png" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={pkg.description} />
    </Helmet>
  )
}
