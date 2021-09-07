import { ThemeUICSSProperties } from '@theme-ui/css'

export const getProps =
  (test: (k: string) => boolean) =>
  <T extends object>(props: T): T => {
    const next: Partial<T> = {}
    for (const key in props) {
      if (test(key || '')) next[key] = props[key]
    }
    return next as T
  }

const MRE = /^m[trblxy]?$/

export interface MarginProps
  extends Pick<
    ThemeUICSSProperties,
    'm' | 'mt' | 'mr' | 'mb' | 'ml' | 'mx' | 'my'
  > {}

export const getMargin: (props: MarginProps) => MarginProps = getProps((k) =>
  MRE.test(k)
)
export const omitMargin = getProps((k) => !MRE.test(k))
