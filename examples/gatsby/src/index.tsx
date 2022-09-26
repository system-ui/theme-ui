import { ReactNode } from 'react'
import { ThemeProvider } from 'theme-ui'
import { Themed, useThemedStylesWithMdx } from '@theme-ui/mdx'
import { MDXProvider, useMDXComponents } from '@mdx-js/react'
import theme from './theme'

export const WrapRootElement = ({ element }: { element: ReactNode }) => {
  const components = useThemedStylesWithMdx(useMDXComponents())

  return (
    <ThemeProvider theme={theme}>
      <MDXProvider components={components}>
        <Themed.root>{element}</Themed.root>
      </MDXProvider>
    </ThemeProvider>
  )
}
