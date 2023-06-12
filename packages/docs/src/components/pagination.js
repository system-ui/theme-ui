// @ts-check
import { Location } from '@reach/router'
import { Pagination } from '../components/sidenav'
import Sidenav from '../sidebar.mdx'

export default (props) => (
  <Location>
    {({ location }) => (
      <Sidenav
        pathname={location.pathname}
        sx={{
          py: 4,
        }}
        components={{
          wrapper: Pagination,
        }}
      />
    )}
  </Location>
)
