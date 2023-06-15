import { Location } from '@reach/router'
import { jsx } from 'theme-ui'

const getHREF = (base, location) => {
  if (location.pathname === '/') return

  const sanitizedLocationPathname = location.pathname.replace(/\/+$/, '')
  const basePagesHref = `${base}/pages` + sanitizedLocationPathname

  if (location.pathname === '/recipes') return `${basePagesHref}/index.js`

  if (location.pathname === '/guides') return `${basePagesHref}/index.mdx`

  if (location.pathname.startsWith('/recipes/') === false)
    return `${basePagesHref}.mdx`

  return `${base}${sanitizedLocationPathname}.mdx`
}

export const EditLink = ({ base, children, ...props }) => (
  <Location
    children={({ location }) => {
      const href = getHREF(base, location)
      if (!href) return false

      return (
        <a
          {...props}
          href={href}
          sx={{
            display: 'inline-block',
            color: 'inherit',
            fontSize: 1,
            my: 4,
          }}
        >
          {children}
        </a>
      )
    }}
  />
)

EditLink.defaultProps = {
  base: 'https://github.com/system-ui/theme-ui/edit/develop/packages/docs/src',
  children: 'Edit the page on GitHub',
}

export default EditLink
