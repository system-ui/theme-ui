/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui'
import Field from './Field'
import Label from './Label'
import { makeHtmlSafeLabel } from '../utils'

const Input = ({ label, ...props }) => {
  const [colorMode] = useColorMode()
  const id = makeHtmlSafeLabel(label)
  return (
    <Field>
      <Label htmlFor={id}>{label}</Label>
      <input
        {...props}
        name={id}
        id={id}
        sx={{
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
