/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui'
import Field from './Field'

const Input = ({ label, ...props }) => {
  const [colorMode] = useColorMode()
  return (
    <Field label={label}>
      <input
        {...props}
        css={{
          appearance: 'none',
          bg: colorMode === 'dark' ? 'color' : 'background',
          color: colorMode === 'dark' ? 'background' : 'color',
          border: `2px solid`,
          borderColor: 'color',
          borderRadius: 6,
          display: `block`,
          fontSize: 1,
          fontFamily: `inherit`,
          lineHeight: 1,
          py: 2,
          px: 2,
          width: `100%`,
          '&:focus': {
            outline: 'none',
            borderColor: 'primary',
          },
        }}
      />
    </Field>
  )
}

export default Input
