// @ts-check
// @see https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/

import * as React from 'react'

import { WrapPageElement } from './src'

export const wrapPageElement = (props) => (
  <React.StrictMode>
    <WrapPageElement {...props} />
  </React.StrictMode>
)
