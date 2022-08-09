import { useMemo } from 'react'
import type { MDXComponents } from 'mdx/types'
import { components } from './Themed'
import { wrapComponentsWithThemeStyles } from './wrapComponentsWithThemeStyles'

/**
 * @example
 * import { MDXProvider, useMDXComponents } from '@mdx-js/react'
 *
 * function MyMdxProvider({ children }) {
 *   const components = useThemedStylesWithMdx(useMDXComponents())
 *
 *   return <MDXProvider components={components}>{children}</MDXProvider>
 * }
 *
 */
export function useThemedStylesWithMdx(outerComponents: MDXComponents) {
  return useMemo(
    () => wrapComponentsWithThemeStyles({ ...components, ...outerComponents }),
    [outerComponents]
  )
}
