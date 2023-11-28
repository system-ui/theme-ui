import { Location } from '@reach/router'
import { Pagination } from './sidenav'
import { sidebar } from '../sidebar'

export default function DocsPagination() {
  return (
    <Location>
      {({ location }) => (
        <Pagination links={sidebar} pathname={location.pathname} />
      )}
    </Location>
  )
}
