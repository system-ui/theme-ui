import Card, { CardProps } from './Card'
import ColorPalette from './ColorPalette'
import TypeStyle from './TypeStyle'

export interface ThemeCardProps extends CardProps {}
export const ThemeCard: React.FC<ThemeCardProps> = (props) => {
  return (
    <Card
      {...props}
      sx={{
        color: 'text',
        bg: 'background',
      }}
    >
      <TypeStyle />
      <ColorPalette label={false} size={32} />
    </Card>
  )
}

export default ThemeCard
