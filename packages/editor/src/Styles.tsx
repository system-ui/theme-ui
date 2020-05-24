/** @jsx jsx */
import { jsx, useThemeUI, AllThemeUICSSProperties } from 'theme-ui'
import { Fragment } from 'react'
import Sx from './Sx'
import { EditorContextValue } from './types'

export default function Styles({ tag = 'root' }) {
  const context = useThemeUI() as EditorContextValue
  const { styles = {} } = context.theme || {}

  // unsafe
  const style = (styles[tag] || {}) as AllThemeUICSSProperties

  const setStyle = next => {
    context.setTheme({
      styles: {
        [tag]: {
          ...style,
          ...next,
        },
      },
    })
  }

  return (
    <Fragment>
      <b>theme.styles.{tag}</b>
      <Sx.Typography
        value={style}
        onChange={setStyle}
        theme={context.theme || undefined}
      />
      <Sx.Margin value={style} onChange={setStyle} />
      <Sx.Colors value={style} onChange={setStyle} />
    </Fragment>
  )
}
