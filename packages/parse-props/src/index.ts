import { InterpolationWithTheme } from '@emotion/core'
import { css } from '@theme-ui/css'

const getCSS = (props: any) => {
  if (!props.sx && !props.css) return undefined
  return (theme: any) => {
    const styles = css(props.sx)(theme)
    const raw = typeof props.css === 'function' ? props.css(theme) : props.css
    return [styles, raw]
  }
}

const parseProps = (props: any) => {
  if (!props) return null
  const next: typeof props & { css?: InterpolationWithTheme<any> } = {}
  for (let key in props) {
    if (key === 'sx') continue
    next[key] = props[key]
  }
  const css = getCSS(props)
  if (css) next.css = css
  return next
}

export default parseProps
