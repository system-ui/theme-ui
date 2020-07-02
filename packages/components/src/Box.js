/** @jsx jsx */
import { jsx } from '@theme-ui/core'

export const Box = ({
  as = 'div',
  sx,
  variant: propsVariant,
  config = {},
  // TODO: backwards compatibility only. add deprecation warning
  // prettier-ignore
  color,
  bg,
  m,
  mt,
  mr,
  mb,
  ml,
  mx,
  my,
  p,
  pt,
  pr,
  pb,
  pl,
  px,
  py,
  //
  ...props
}) => {
  const variant = config.group
    ? config.group + '.' + propsVariant
    : propsVariant
  // prettier-ignore
  const styles = {
    boxSizing: 'border-box',
    margin: 0,
    minWidth: 0,
      color, bg,
      m, mt, mr, mb, ml, mx, my,
      p, pt, pr, pb, pl, px, py,
    ...config.sx,
    variant,
    ...sx,
  }

  return jsx(as, {
    sx: styles,
    ...props,
  })
}

export default Box
