/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import Card from './Card'
import ColorPalette from './ColorPalette'
import TypeStyle from './TypeStyle'

export const ThemeCard = props => {
  const { theme } = useThemeUI()

  return (
    <Card
      {...props}
      sx={{
        color: 'text',
        bg: 'background',
      }}>
      <TypeStyle />
      <ColorPalette
        label={false}
        size={32}
      />
    </Card>
  )
}

export default ThemeCard
