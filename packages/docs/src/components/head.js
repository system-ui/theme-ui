import React from 'react'
import { Helmet } from 'react-helmet'
import { useThemeUI } from 'theme-ui'
import pkg from 'theme-ui/package.json'

export default (props) => {
  const title = [
    props.title,
    props.pageContext.frontmatter ? props.pageContext.frontmatter.title : false,
    props._frontmatter ? props._frontmatter.title : false,
    'Theme UI',
  ]
    .filter(Boolean)
    .join(' – ')

  const { theme, colorMode } = useThemeUI()

  const isColorModeDark = ['dark', 'deep'].includes(colorMode)

  return (
    <Helmet htmlAttributes={{ lang: 'en-US' }}>
      <title>{title}</title>
      <meta name="description" content={pkg.description} />
      <link rel="icon" type="image/png" href="/icon.png" />
      <link
        rel="icon"
        media="(prefers-color-scheme:dark)"
        href="/icon-dark.png"
        type="image/png"
      />
      <link rel="apple-touch-icon" type="image/png" href="/icon.png" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@jxnblk" />
      <meta name="twitter:image" content="https://theme-ui.com/card.png" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={pkg.description} />

      <meta name="theme-color" content={theme.colors.background} />
      <meta name="color-scheme" content={isColorModeDark ? 'dark' : 'light'} />

      <script
        src="https://unpkg.com/favicon-switcher@1.2.2/dist/index.js"
        crossOrigin="anonymous"
        type="application/javascript"
      />
    </Helmet>
  )
}
