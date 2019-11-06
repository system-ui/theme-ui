/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'
import { useEditor } from './context'
import SxColors from './SxColors'
import SxMargin from './SxMargin'
import SxTypography from './SxTypography'

export default ({ tag = 'root' }) => {
  const context = useEditor()
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
      <SxTypography
        value={style}
        onChange={setStyle}
        theme={context.theme}
      />
      <SxMargin
        value={style}
        onChange={setStyle}
      />
      <SxColors
        value={style}
        onChange={setStyle}
      />
    </Fragment>
  )
}
