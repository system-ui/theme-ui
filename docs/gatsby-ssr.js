import React from 'react'
import Root from './src/components/root'
import { useThemeUI } from 'theme-ui'

// export { wrapRootElement } from './src'

let theme, mode
const GetTheme = props => {
  const context = useThemeUI()
  theme = context.theme
  return false
}

export const wrapRootElement = ({ element }) =>
  <Root>
    <GetTheme />
    {element}
  </Root>

// prototype for dark mode flash prevention
// based on https://github.com/donavon/use-dark-mode/blob/develop/noflash.js.txt
const CLASSNAME = 'theme-ui-color-mode-'

const noflash = `
(function() {
  try {
    var mode = localStorage.getItem('theme-ui-color-mode');
    var css = localStorage.getItem('theme-ui-colors');
    var style = document.getElementById('theme-ui-color-mode');
    style.innerHTML = css;
  } catch (err) {
  }
})();
`

const style = css => (
  <style
    key='theme-ui-color-mode'
    id='theme-ui-color-mode'
    dangerouslySetInnerHTML={{
      __html: css
    }}
  />
)

const script = (
  <script
    key='theme-ui-color-mode-script'
    dangerouslySetInnerHTML={{
      __html: noflash
    }}
  />
)

const createCriticalCSS = theme => {
  if (!theme || !theme.colors || !theme.colors.modes) return ''
  const { modes } = theme.colors
  let css = ''
  Object.keys(modes).forEach(key => {
    const { text, background } = modes[key]
    const classname = `.theme-ui-color-mode-${key}`
    css += `${classname}{
      --theme-ui-text: ${text};
      --theme-ui-background: ${background};
    }`
  })
  return css
}

export const onRenderBody = ({
  setHeadComponents,
  setPreBodyComponents,
  setBodyAttributes,
  ...args
}) => {
  const css = createCriticalCSS(theme)
  console.log('onRenderBody', css)

  setBodyAttributes({
    className: CLASSNAME,
    style: {
      // todo: look into custom properties
      // '--theme-ui-color': ,
      // backgroundColor: 'var(--theme-ui-background-color)',
    }
  })
  setHeadComponents([ style(css) ])
  setPreBodyComponents([ script ])
}
