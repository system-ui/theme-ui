import Tiles from './tiles'

export default (props) => (
  <Tiles
    {...props}
    sx={{
      my: 4,
      p: {
        m: 0,
      },
      a: {
        variant: 'text.heading',
        display: 'block',
        fontWeight: 'bold',
        fontSize: 3,
        color: 'inherit',
        textDecoration: 'none',
        ':hover,:focus': {
          color: 'primary',
        },
      },
    }}
  />
)
