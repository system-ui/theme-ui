import { css, get } from '@theme-ui/css'

export const themed = key => props =>
  css(get(props.theme, `styles.${key}`))(props.theme)

export default themed
