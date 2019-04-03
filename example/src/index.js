import React from 'react'
import Root from './components/root'

export const wrapRootElement = ({ element, props }) =>
  <Root {...props}>
    {element}
  </Root>
