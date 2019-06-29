/** @jsx jsx */
import { jsx } from 'theme-ui'

const Button = ({ ...props }) => {
  return (
    <button
      {...props}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 1,
        py: 2,
        px: 3,
        border: `2px solid`,
        borderColor: 'background',
        borderRadius: 6,
        color: 'background',
        bg: 'primary',
        cursor: 'pointer',
        '&:hover, &:focus': {
          color: 'background',
          bg: 'text',
        },
        '&:focus': {
          outline: 'none',
          borderColor: 'primary',
        },
      }}
    />
  )
}

export default Button
