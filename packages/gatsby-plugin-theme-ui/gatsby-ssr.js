import { jsx, applyColorModeFromLocalStorage } from 'theme-ui'

export { wrapRootElement } from './src/provider'

export const onRenderBody = ({ setPreBodyComponents }) => {
  const script = jsx('script', {
    key: 'theme-ui-noscript',
    dangerouslySetInnerHTML: {
      __html: applyColorModeFromLocalStorage,
    },
  })
  setPreBodyComponents([script])
}
