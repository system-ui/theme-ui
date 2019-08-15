import { jsx, InitializeColorMode } from 'theme-ui'

export { wrapRootElement } from './src/provider'

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([jsx(InitializeColorMode, { key: 'theme-ui-no-flash' })])
}
