// @ts-check

import * as React from 'react'

import { WrapPageElement, setDocSearchComponents } from './src'

export const wrapPageElement = (props) => <WrapPageElement {...props} />

export const onRenderBody = (args) => {
  setDocSearchComponents(args)
}
