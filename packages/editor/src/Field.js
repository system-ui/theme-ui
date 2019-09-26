/** @jsx jsx */
import { jsx } from 'theme-ui'
import Label from './Label'
import Input from './Input'

const noop = () => {}

export default ({
  type = 'text',
  label,
  name,
  onChange = noop,
  className,
  ...props
}) => (
  <div className={className}>
    <Label htmlFor={name}>{label || name}</Label>
    <Input
      {...props}
      type={type}
      id={name}
      name={name}
      onChange={e => {
        onChange(e.target.value)
      }}
    />
  </div>
)
