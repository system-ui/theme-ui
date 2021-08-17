import { ThemeUICSSProperties } from '@theme-ui/core'

export const getProps =
  (test: (k: string) => boolean) =>
  (props: Record<string, unknown>): Record<string, unknown> => {
    const next: Record<string, unknown> = {}
    for (const key in props) {
      if (test(key || '')) next[key] = props[key]
    }
    return next
  }

const MRE = /^m[trblxy]?$/

export interface MarginProps
  extends Pick<
    ThemeUICSSProperties,
    'm' | 'mt' | 'mr' | 'mb' | 'ml' | 'mx' | 'my'
  > {}

export const getMargin = getProps((k) => MRE.test(k))
export const omitMargin = getProps((k) => !MRE.test(k))
