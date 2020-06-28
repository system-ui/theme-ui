import { jsx, IntrinsicSxElements } from '@theme-ui/core'
import { css, get, Theme } from '@theme-ui/css'
import { ComponentType, FC, ReactNode } from 'react'
import styled, { CreateStyled } from '@emotion/styled'
import {
  MDXProvider as _MDXProvider,
  useMDXComponents,
  MDXProviderComponents as BaseProviderComponents,
} from '@mdx-js/react'

interface MDXProviderComponents extends BaseProviderComponents {
  [key: string]: Parameters<CreateStyled>[0] | ComponentType<any> | undefined
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

const aliases: Pick<MdxAliases, MdxAliasesKeys> = {
  inlineCode: 'code',
  thematicBreak: 'hr',
  root: 'div',
}

export type StyledComponentName =
  | keyof IntrinsicSxElements
  | keyof JSX.IntrinsicElements

const alias = (n: StyledComponentName): keyof JSX.IntrinsicElements =>
  aliases[n] || n

export const themed = (key: StyledComponentName) => (props: ThemedProps) =>
  css(get(props.theme, `styles.${key}`))(props.theme)

export const Styled = styled('div')(themed('div'))

export const components = {}

tags.forEach((tag) => {
  components[tag] = styled(alias(tag))(themed(tag))
  Styled[tag] = components[tag]
})

const createComponents = (comps: MDXProviderComponents) => {
  const next = { ...components }

  const componentKeys = Object.keys(comps) as Array<keyof IntrinsicSxElements>

  componentKeys.forEach((key) => {
    next[key] = styled<any>(comps[key])(themed(key))
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
