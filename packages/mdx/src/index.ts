import { jsx, IntrinsicSxElements } from '@theme-ui/core'
import { css, get, Theme } from '@theme-ui/css'
import {
  ComponentType,
  FC,
  ReactNode,
  DetailedHTMLProps,
  HTMLAttributes,
  ElementType,
  ComponentProps,
} from 'react'
import styled, { StyledComponent } from '@emotion/styled'
import { MDXProvider as _MDXProvider, useMDXComponents } from '@mdx-js/react'

type MDXProviderComponentsKnownKeys = {
  [key in keyof IntrinsicSxElements]?: React.ComponentType<any> | string
}
export interface MDXProviderComponents extends MDXProviderComponentsKnownKeys {
  [key: string]: React.ComponentType<any> | string | undefined
}
export type MdxAliases = {
  [key in keyof IntrinsicSxElements]: keyof JSX.IntrinsicElements
}

export type MdxAliasesKeys = 'inlineCode' | 'thematicBreak' | 'root'

export type ThemedProps = {
  theme: Theme
}

export interface MdxProviderProps {
  components?: MDXProviderComponents
  children: ReactNode
}

// mdx components
const tags: Array<keyof IntrinsicSxElements> = [
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
]

const aliases = {
  inlineCode: 'code',
  thematicBreak: 'hr',
  root: 'div',
} as const

type Aliases = typeof aliases
const isAlias = (x: string): x is keyof Aliases => x in aliases

export type StyledComponentName =
  | keyof IntrinsicSxElements
  | keyof JSX.IntrinsicElements

const alias = (n: StyledComponentName): keyof JSX.IntrinsicElements =>
  isAlias(n) ? aliases[n] : n

export const themed = (key: StyledComponentName) => (props: ThemedProps) =>
  css(get(props.theme, `styles.${key}`))(props.theme)

// opt out of typechecking whenever `as` prop is used
interface AnyComponentProps extends JSX.IntrinsicAttributes {
    [key: string]: unknown
}

export type WithPoorAsProp<
  Props,
  As extends ElementType | undefined = undefined
> = {
  as?: As
} & (As extends undefined ? Props : AnyComponentProps)

export interface ThemedComponent<Name extends ElementType> {
  <As extends ElementType | undefined = undefined>(
    props: WithPoorAsProp<ComponentProps<Name>, As>
  ): JSX.Element
}

export type StyledComponentsDict = {
  [K in keyof IntrinsicSxElements]: K extends keyof Aliases
    ? ThemedComponent<Aliases[K]>
    : K extends keyof JSX.IntrinsicElements
    ? ThemedComponent<K>
    : never
}

type StyledDiv = StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  ThemedProps,
  Theme
>

export const Styled: StyledDiv & StyledComponentsDict = styled('div')(
  themed('div')
) as StyledDiv & StyledComponentsDict

export const components = {} as StyledComponentsDict

tags.forEach((tag) => {
  // fixme?
  components[tag] = styled(alias(tag))(themed(tag)) as any
  Styled[tag] = components[tag] as any
})

const createComponents = (comps: MDXProviderComponents) => {
  const next = { ...components }

  const componentKeys = Object.keys(comps) as Array<keyof IntrinsicSxElements>

  componentKeys.forEach((key) => {
    ;(next[key] as StyledComponentsDict[typeof key]) = styled<any>(comps[key])(
      themed(key)
    ) as StyledComponentsDict[typeof key]
  })
  return next
}

export const MDXProvider: FC<MdxProviderProps> = ({ components, children }) => {
  const outer = useMDXComponents() as MDXProviderComponents

  return jsx(_MDXProvider, {
    components: createComponents({ ...outer, ...components }),
    children,
  })
}
