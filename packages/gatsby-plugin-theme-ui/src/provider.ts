/** @jsx jsx */
import { jsx, ThemeProvider } from 'theme-ui'
import { WrapRootElementBrowserArgs } from 'gatsby'
import theme from './index'
import components from './components'

interface WrapRootElementArgs {
  element: WrapRootElementBrowserArgs['element']
}
export const wrapRootElement = ({ element }: WrapRootElementArgs) =>
  jsx(
    ThemeProvider,
    {
      theme,
      components,
    },
    element
  )
