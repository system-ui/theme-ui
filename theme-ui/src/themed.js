import css from '@styled-system/css'
import get from 'lodash.get'

export const themed = key => props => css(get(props.theme, `styles.${key}`))(props.theme)

export default themed
