import { jsx, InitializeColorMode } from 'theme-ui'

export { wrapRootElement } from './src/provider'

export const onRenderBody = (
  { setPreBodyComponents },
  { noFlashScript = true }
) => {
  if (noFlashScript) {
    setPreBodyComponents([
      jsx(InitializeColorMode, { key: 'theme-ui-no-flash' }),
    ])
  }
}
