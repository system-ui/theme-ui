const {
  jsx,
  ColorModeProvider,
  ColorMode,
  ThemeProvider,
} = require('theme-ui')

const noflash = `
(function() {
  try {
    var mode = localStorage.getItem('theme-ui-color-mode');
    if (!mode) return
    document.body.classList.add('theme-ui-' + mode);
  } catch (e) {
  }
})();
`

exports.wrapRootElement = ({ element }, opts) =>
  jsx(ColorModeProvider, opts,
    jsx(ColorMode),
    element
  )

exports.onRenderBody = ({
  setPreBodyComponents,
}) => {
  const script = jsx('script', {
    dangerouslySetInnerHTML: {
      __html: noflash
    }
  })
  setPreBodyComponents([ script ])
}
