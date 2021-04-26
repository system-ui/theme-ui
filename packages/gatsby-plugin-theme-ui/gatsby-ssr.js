import * as React from "react"
import { jsx, InitializeColorMode } from 'theme-ui'
import { WrapRootElement } from './src/provider'

export const onRenderBody = (
  { setPreBodyComponents },
  { injectColorFlashScript = true }
) => {
  if (injectColorFlashScript) {
    setPreBodyComponents([
      jsx(InitializeColorMode, { key: 'theme-ui-no-flash' }),
    ])
  }
}

export const wrapRootElement = ({ element }) => (
  <WrapRootElement element={element} />
)
