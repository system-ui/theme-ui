import React from 'react'
import { InitializeColorMode } from 'theme-ui'

export { wrapRootElement } from './src/provider'

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([<InitializeColorMode />])
}
