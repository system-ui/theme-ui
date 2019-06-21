/** @jsx jsx */
import { Location } from '@reach/router'
import { jsx } from 'theme-ui'

const getHREF = (base, location) => {
  if (location.pathname === '/') return false
  return base + location.pathname.replace(/\/+$/, '') + '.mdx'
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
  base:
    'https://github.com/system-ui/theme-ui/edit/master/packages/docs/src/pages',
  children: 'Edit the page on GitHub',
}

export default EditLink
