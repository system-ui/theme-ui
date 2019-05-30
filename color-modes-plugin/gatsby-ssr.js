const React = require('react')
const {
  jsx,
  ColorModeProvider,
  useThemeUI,
} = require('theme-ui')
const emotion = require('emotion')
const get = require('lodash.get')

exports.wrapRootElement = ({ element }, opts) =>
  jsx(ColorModeProvider, opts, element)

let theme
const GetTheme = props => {
  const context = useThemeUI()
  theme = theme || context.theme
  return false
}

exports.wrapPageElement = ({ element }) =>
  jsx(React.Fragment, null,
    jsx(GetTheme),
    element
  )

const createCSS = theme => {
  if (!theme || !theme.colors || !theme.colors.modes) return {}
  let styles = {}
  Object.keys(theme.colors.modes).forEach(mode => {
    const colors = theme.colors.modes[mode]
    if (typeof colors !== 'object') return
    Object.assign(styles, {
      [`&-${mode}`]: {
        color: colors.text,
        backgroundColor: colors.background,
      }
    })
  })
  const className = emotion.css(styles)
  const body = get(emotion.cache, `registered.${className}`)
  const css = body.replace(/&/g, '.' + className)
  return { className, css }
}

const noflash = (className) => `
(function() {
  try {
    var mode = localStorage.getItem('theme-ui-color-mode');
    if (!mode) return
    document.body.classList.add('${className}-' + mode);
  } catch (e) {
  }
})();
`

exports.onRenderBody = ({
  setHeadComponents,
  setPreBodyComponents,
  setBodyAttributes,
}) => {
  if (!theme) return

  const { css, className } = createCSS(theme)

  const style = jsx('style', {
    'data-theme-ui': true,
    dangerouslySetInnerHTML: {
      __html: css,
    }
  })
  const script = jsx('script', {
    dangerouslySetInnerHTML: {
      __html: noflash(className)
    }
  })
  setHeadComponents([ style ])
  setBodyAttributes({ className })
  setPreBodyComponents([ script ])
}
