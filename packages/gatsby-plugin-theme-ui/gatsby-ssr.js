import { jsx } from 'theme-ui'

export { wrapRootElement } from './src/provider'

const noflash = `
(function() {
  try {
    var mode = localStorage.getItem('theme-ui-color-mode');
    if (!mode) return
    document.body.classList.add('theme-ui-' + mode);
  } catch (e) {}
})();
`

export const onRenderBody = ({ setPreBodyComponents }) => {
  const script = jsx('script', {
    key: 'theme-ui-noscript',
    dangerouslySetInnerHTML: {
      __html: noflash,
    },
  })
  setPreBodyComponents([script])
}
