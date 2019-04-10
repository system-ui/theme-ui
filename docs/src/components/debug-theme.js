import React, { useContext } from 'react'
import { Context } from 'theme-ui'

export default props => {
  const theme = useContext(Context)
  return (
    <pre
      children={JSON.stringify(theme, null, 2)}
    />
  )
}
