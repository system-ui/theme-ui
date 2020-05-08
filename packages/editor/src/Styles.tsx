/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { Fragment } from 'react'
import Sx from './Sx'
import { EditorContext } from './types'

export default ({ tag = 'root' }) => {
  const context = useThemeUI() as EditorContext
  const { styles = {} } = context.theme

  const style = styles[tag] || {}

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
      <Sx.Typography value={style} onChange={setStyle} theme={context.theme} />
      <Sx.Margin value={style} onChange={setStyle} />
      <Sx.Colors value={style} onChange={setStyle} />
    </Fragment>
  )
}
