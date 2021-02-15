import { Theme } from './types'

/**
 * @internal
 * We fall back to `theme.config.useBodyStyles` when `theme.config.useRootStyles` is not set.
 */
export function __internalGetUseRootStyles(theme: Theme = {}) {
  const { useRootStyles, useBodyStyles } = theme.config || theme
  const root = 'useRootStyles' in theme && useRootStyles != null

  return {
    scope: root ? 'html' : 'body',
    rootStyles: root ? useRootStyles : useBodyStyles,
  }
}
