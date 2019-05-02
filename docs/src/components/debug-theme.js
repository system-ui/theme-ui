/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useContext } from 'react'
import { Context } from 'theme-ui'

export default props => {
  const theme = useContext(Context)
  return (
    <pre
      children={JSON.stringify(theme, null, 2)}
    />
  )
}
