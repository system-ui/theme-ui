import { jsx, InitializeColorMode } from 'theme-ui'
import { RenderBodyArgs } from 'gatsby'

export { wrapRootElement } from './src/provider'

export const onRenderBody = ({ setPreBodyComponents }: RenderBodyArgs) => {
  setPreBodyComponents([jsx(InitializeColorMode, { key: 'theme-ui-no-flash' })])
}
