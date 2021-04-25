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

export interface ThemeUIConfig {
  /**
   * Enable/disable custom CSS properties/variables if lower browser
   * support is required (for eg. IE 11).
   *
   * References: https://theme-ui.com/color-modes/#turn-off-custom-properties
   */
  useCustomProperties?: boolean

  /**
   * Provide a value here to enable color modes
   */
  initialColorModeName?: string

  /**
   * Provide a value here to set a color mode for printing
   */
  printColorModeName?: string

  /**
   * Adds styles defined in theme.styles.root to the <html> element along with color and background-color
   */
  useRootStyles?: boolean

  /**
   * Initializes the color mode based on the prefers-color-scheme media query
   */
  useColorSchemeMediaQuery?: boolean

  /**
   * Adds a global box-sizing: border-box style
   */
  useBorderBox?: boolean

  /**
   * If false, does not save color mode as a localStorage value.
   */
  useLocalStorage?: boolean
}
