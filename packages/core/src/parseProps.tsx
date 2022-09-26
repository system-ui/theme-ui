import { css } from '@theme-ui/css'

const getCSS = (props: any) => (theme: any) => {
  const styles = css(props.sx)(theme)
  const raw = typeof props.css === 'function' ? props.css(theme) : props.css
  return [styles, raw]
}

export function parseProps(props: any) {
  if (!props || (!props.sx && !props.css)) return props

  const next: Record<string, unknown> = {}

  for (let key in props) {
    if (key === 'sx') continue
    next[key] = props[key]
  }

  next.css = getCSS(props)
  return next
}
