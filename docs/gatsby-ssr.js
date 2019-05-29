import React from 'react'

export { wrapRootElement } from './src'

// prototype for dark mode flash prevention
// based on https://github.com/donavon/use-dark-mode/blob/develop/noflash.js.txt
const CLASSNAME = 'theme-ui-color-mode'
const noflash = `
(function() {
  var darkQuery = '(prefers-color-scheme: dark)';
  var list = window.matchMedia ? window.matchMedia(darkQuery) : {};
  var dark = list.media === darkQuery && list.matches;
  var stored, colors;

  try {
    stored = localStorage.getItem('theme-ui-color-mode');
    var json = localStorage.getItem('theme-ui-colors');
    colors = JSON.parse(json);
    var css = '.' + '${CLASSNAME}'
      + '{color:'
      + colors.text
      + ';background-color:'
      + colors.background
      + '}';
    var style = document.getElementById('theme-ui-color-mode');
    style.innerHTML = css;
    console.log('stored color mode', stored, colors);
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
  setPreBodyComponents([
    style,
    script
  ])
}
