// @ts-check
// @see https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/

import * as React from 'react'

import { WrapPageElement, setDocSearchComponents } from './src'

export const wrapPageElement = (props) => (
  <React.StrictMode>
    <WrapPageElement {...props} />
  </React.StrictMode>
)

export const onRenderBody = (args) => {
  setDocSearchComponents(args)
}
