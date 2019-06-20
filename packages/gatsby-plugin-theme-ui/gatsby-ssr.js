const { jsx } = require('theme-ui')

exports.wrapRootElement = require('./root')

// prevent color mode flash
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

exports.onRenderBody = ({ setPreBodyComponents }) => {
  const script = jsx('script', {
    dangerouslySetInnerHTML: {
      __html: noflash,
    },
  })
  setPreBodyComponents([script])
}
