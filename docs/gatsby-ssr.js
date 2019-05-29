import React from 'react'

export { wrapRootElement } from './src'

// prototype for dark mode flash prevention
// based on https://github.com/donavon/use-dark-mode/blob/develop/noflash.js.txt
const CLASSNAME = 'theme-ui-color-mode'

const noflash = `
(function() {
  try {
    var css = localStorage.getItem('theme-ui-colors');
    var style = document.getElementById('theme-ui-color-mode');
    style.innerHTML = css;
  } catch (err) {
  }
})();
`

const style = (
  <style
    key='theme-ui-color-mode'
    id='theme-ui-color-mode'
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

export const onRenderBody = ({
  setHeadComponents,
  setPreBodyComponents,
  setBodyAttributes,
}) => {
  setBodyAttributes({
    className: CLASSNAME,
    style: {
      // todo: look into custom properties
      // color: 'var(--theme-ui-color)',
      // backgroundColor: 'var(--theme-ui-background-color)',
    }
  })
  setHeadComponents([ style ])
  setPreBodyComponents([ script ])
}
