/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'

export default () => {
  const theme = useThemeUI()
  return <pre children={JSON.stringify(theme, null, 2)} />
}
