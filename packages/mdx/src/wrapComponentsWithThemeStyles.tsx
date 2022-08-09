import { jsx } from '@theme-ui/core'
import { ComponentType } from 'react'
import { MDXComponents } from 'mdx/types'
import { defaultMdxComponents, ThemedComponent, themed } from './Themed'

function wrapComponent(
  value: ComponentType<any> | string,
  key: string
): ThemedComponent<string> {
  const component: ThemedComponent<string> = (props) => {
    return jsx(value, { ...props, css: themed(key) })
  }

  component.displayName = "MdxComponents('" + key + "')"
  return component
}

/** @internal */
export const wrapComponentsWithThemeStyles = (comps: MDXComponents) => {
  const next: MDXComponents = { ...defaultMdxComponents }

  // We enrich user's components with the styles from theme.styles.
  // Example: `components.p` will get the styles from `theme.styles.p` as className.
  for (const key of Object.keys(comps)) {
    const value = comps[key]

    next[key as string] =
      typeof value === 'object'
        ? wrapComponentsWithThemeStyles(value)
        : wrapComponent(value, key)
  }

  return next
}
