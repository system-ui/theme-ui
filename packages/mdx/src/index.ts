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
  createElement,
  useEffect,
} from 'react'
import styled, { StyledComponent } from '@emotion/styled'
import { MDXProvider as _MDXProvider, useMDXComponents } from '@mdx-js/react'

type MDXProviderComponentsKnownKeys = {
  [key in keyof IntrinsicSxElements]?: ComponentType<any> | string
}
export interface MDXProviderComponents extends MDXProviderComponentsKnownKeys {
  [key: string]: ComponentType<any> | string | undefined
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

export type ThemedComponentName =
  | keyof IntrinsicSxElements
  | keyof JSX.IntrinsicElements

const alias = (n: ThemedComponentName): keyof JSX.IntrinsicElements =>
  isAlias(n) ? aliases[n] : n

const propOverrides: {
  [key in Partial<ThemedComponentName>]?: Record<string, string>
} = {
  th: {
    align: 'textAlign',
  },
  td: {
    align: 'textAlign',
  },
}
export const themed = (key: ThemedComponentName) => ({
  theme,
  ...rest
}: ThemedProps) => {
  const propsStyle = propOverrides[key]

  const extraStyles = propsStyle
    ? Object.keys(rest)
        .filter((prop) => propsStyle[prop] !== undefined)
        .reduce(
          (acc, prop) => ({
            ...acc,
            [propsStyle[prop]]: (rest as Record<string, string>)[prop],
          }),
          {}
        )
    : undefined
  return css({ ...get(theme, `styles.${key}`), ...extraStyles })(theme)
}

// opt out of typechecking whenever `as` prop is used
interface AnyComponentProps extends JSX.IntrinsicAttributes {
  [key: string]: unknown
}

export type WithPoorAsProp<
  Props,
  As extends ElementType | undefined = undefined
> = {
  as?: As
} & (undefined extends As
  ? As extends undefined
    ? Props
    : AnyComponentProps
  : AnyComponentProps)

export interface ThemedComponent<Name extends ElementType> {
  <As extends ElementType | undefined = undefined>(
    props: WithPoorAsProp<ComponentProps<Name>, As>
  ): JSX.Element
}

export type ThemedComponentsDict = {
  [K in keyof IntrinsicSxElements]: K extends keyof Aliases
    ? ThemedComponent<Aliases[K]>
    : K extends keyof JSX.IntrinsicElements
    ? ThemedComponent<K>
    : never
}

type ThemedDiv = StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  ThemedProps,
  Theme
>

export const Themed: ThemedDiv & ThemedComponentsDict = styled('div')(
  themed('div')
) as ThemedDiv & ThemedComponentsDict

/**
 * @deprecated since 0.6.0.
 *
 * `Styled` was renamed to `Themed` to avoid confusion with styled components.
 */
export const Styled: ThemedDiv & ThemedComponentsDict = styled('div')(
  themed('div')
) as ThemedDiv & ThemedComponentsDict

const warnStyled = (tag: keyof IntrinsicSxElements): FC => (props) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '[theme-ui] The Styled component from "@theme-ui/mdx" is deprecated and will be removed in a future version. It has been renamed to Themed with the same API.'
      )
    }
  }, [])
  return createElement(alias(tag), props)
}

export const components = {} as ThemedComponentsDict

tags.forEach((tag) => {
  // fixme?
  components[tag] = styled(alias(tag))(themed(tag)) as any
  Themed[tag] = components[tag] as any

  Styled[tag] = styled(warnStyled(tag))(themed(tag)) as any
})

const createComponents = (comps: MDXProviderComponents) => {
  const next = { ...components }

  const componentKeys = Object.keys(comps) as Array<keyof IntrinsicSxElements>

  componentKeys.forEach((key) => {
    ;(next[key] as ThemedComponentsDict[typeof key]) = styled<any>(comps[key])(
      themed(key)
    ) as ThemedComponentsDict[typeof key]
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
