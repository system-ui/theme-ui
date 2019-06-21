/** @jsx jsx */
import { jsx, Context } from 'theme-ui'
import { useContext } from 'react'

export default props => {
  const theme = useContext(Context)
  return <pre children={JSON.stringify(theme, null, 2)} />
}
