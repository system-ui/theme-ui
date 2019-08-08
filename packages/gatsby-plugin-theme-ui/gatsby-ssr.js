import { ApplyColorModeFromLocalStorage } from 'theme-ui'

export { wrapRootElement } from './src/provider'

export const onRenderBody = ({ setPreBodyComponents }) => {
  console.log(ApplyColorModeFromLocalStorage)
  setPreBodyComponents([ApplyColorModeFromLocalStorage])
}
