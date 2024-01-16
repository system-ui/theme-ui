import type { ThemeUICSSObject, ThemeUICSSProperties } from '@theme-ui/css'

/** @internal */
export function __internalProps(props: __ThemeUIComponentsInternalProps) {
  return props as {}
}

/**
 * @internal Props used by Theme UI Components not intended for user code.
 */
export interface __ThemeUIComponentsInternalProps {
  __css?: ThemeUICSSObject
  __themeKey?: string
}
