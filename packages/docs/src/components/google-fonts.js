// for development only
import { useEffect, useContext } from 'react'
import { Context } from 'theme-ui'

const parseTypographyGoogleFonts = typography => {
  const { googleFonts } = typography.options
  if (!googleFonts) return null
  const families = googleFonts
    .map(
      ({ name, styles }) => `${name.split(' ').join('+')}:${styles.join(',')}`
    )
    .join('|')
  const href = `https://fonts.googleapis.com/css?family=${families}`
  return href
}

export default props => {
  const { theme } = useContext(Context)
  if (!theme.typography) return false
  const href = parseTypographyGoogleFonts(theme.typography)
  if (!href) return false
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    document.head.appendChild(link)
  }, [theme.typography])

  return false
}
