import * as React from "react"
import { WrapRootElement } from './src/provider'

export const wrapRootElement = ({ element }) => (
  <WrapRootElement element={element} />
)
