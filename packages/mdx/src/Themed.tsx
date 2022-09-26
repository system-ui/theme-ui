/** @jsx jsx */
import { jsx, SxProp } from '@theme-ui/core'
import { css, get, Theme } from '@theme-ui/css'
import {
  ComponentType,
  ReactNode,
  DetailedHTMLProps,
  HTMLAttributes,
  ComponentProps,
} from 'react'

// mdx components
const tags = [
  'p',
  'b',
  'i',
  'a',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'img',
  'pre',
  'code',
  'ol',
  'ul',
  'li',
  'blockquote',
  'hr',
  'em',
  'table',
  'tr',
  'th',
  'td',
  'em',
  'strong',
  'del',
  // mdx
  'inlineCode',
  'thematicBreak',
  // other
  'div',
  // theme-ui
  'root',
] as const

export type ThemeUIMdxIntrinsics = typeof tags[number]

const aliases = {
  inlineCode: 'code',
  thematicBreak: 'hr',
  root: 'div',
} as const

export type MdxAliasesKeys = keyof typeof aliases

type MDXProviderComponentsKnownKeys = {
  [key in ThemeUIMdxIntrinsics]?: ComponentType<any> | string
}
export interface MDXProviderComponents extends MDXProviderComponentsKnownKeys {
  [key: string]: ComponentType<any> | string | undefined
}
export type MdxAliases = {
  [key in ThemeUIMdxIntrinsics]: keyof JSX.IntrinsicElements
}

export type ThemedProps = {
  theme: Theme
}

export interface MdxProviderProps {
  components?: MDXProviderComponents
  children: ReactNode
}

type Aliases = typeof aliases
const isAlias = (x: string): x is keyof Aliases => x in aliases

const alias = (n: ThemeUIMdxIntrinsics): keyof JSX.IntrinsicElements =>
  isAlias(n) ? aliases[n] : n

/**
 * Extracts styles from `theme.styles` object
 */
export const themed =
  (key: ThemeUIMdxIntrinsics | (string & {})) => (theme: Theme) =>
    css(get(theme, `styles.${key}`))(theme)

export interface ThemedComponent<Name extends string> {
  (
    props: SxProp &
      (Name extends keyof JSX.IntrinsicElements ? ComponentProps<Name> : {})
  ): JSX.Element
  displayName: string
}

export type ThemedComponentsDict = {
  [K in ThemeUIMdxIntrinsics]: K extends keyof Aliases
    ? ThemedComponent<Aliases[K]>
    : K extends keyof JSX.IntrinsicElements
    ? ThemedComponent<K>
    : never
}

const createThemedComponent = <Name extends string>(
  name: Name,
  variant: ThemeUIMdxIntrinsics
): ThemedComponent<Name> => {
  const variantStyles = themed(variant)

  const component: ThemedComponent<Name> = (props) => {
    const extraStyles: { textAlign?: 'left' | 'right' | 'center' | 'justify' } =
      {}

    if (name === 'th' || name === 'td') {
      const { align } = props as DetailedHTMLProps<
        React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
        HTMLTableHeaderCellElement
      >

      if (align !== 'char') extraStyles.textAlign = align
    }

    return jsx(name, {
      ...props,
      css: [props.css, variantStyles, extraStyles].filter(Boolean),
    })
  }

  component.displayName = `Themed(${name})`

  return component
}

export const defaultMdxComponents = {} as ThemedComponentsDict
export const Themed: ThemedComponentsDict = {} as ThemedComponentsDict

tags.forEach((tag) => {
  const component = createThemedComponent(alias(tag), tag)

  defaultMdxComponents[tag] = component
  Themed[tag] = component
})
