/** @jsx jsx */
import { jsx } from 'theme-ui'
import Field from './Field'
import Label from './Label'
import { makeHtmlSafeLabel } from '../utils'

const Select = ({ label, options, ...props }) => {
  const id = makeHtmlSafeLabel(label)
  return (
    <Field>
      <Label htmlFor={id}>{label}</Label>
      <select {...props} name={id} id={id} sx={{ width: '100%' }}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Field>
  )
}

export default Select
