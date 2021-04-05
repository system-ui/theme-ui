/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { ThemeUIExtendedCSSProperties, ThemeUIStyleObject } from '@theme-ui/css'
import { Fragment } from 'react'
import * as Sx from './Sx'
import { EditorContextValue } from './types'

export default function Styles({ tag = 'root' }) {
  const context = useThemeUI() as EditorContextValue
  const { styles = {} } = context.theme || {}

  // todo: this is unsafe, and most probably a bug
  const style = (styles[tag] || {}) as ThemeUIExtendedCSSProperties

  const setStyle = (
    next:
      | Parameters<Sx.TypographyProps['onChange']>[0]
      | Parameters<Sx.MarginProps['onChange']>[0]
      | Parameters<Sx.ColorsProps['onChange']>[0]
  ) => {
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
