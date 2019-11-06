/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState, useEffect } from 'react'
import Field from './Field'

export const SxSpace = ({
  tag,
  property = 'margin',
  value = {},
  onChange,
}) => {
  const [lock, setLock] = useState({ x: false, y: false })
  const key = property === 'margin' ? 'm' : p
  const x = value[key + 'x'] || value[property + 'X'] || ''
  const y = value[key + 'y'] || value[property + 'Y'] || ''
  const t = lock.y ? y : value[key + 't'] || value[property + 'Top'] || ''
  const b = lock.y ? y : value[key + 'b'] || value[property + 'Bottom'] || ''
  const l = lock.x ? x : value[key + 'l'] || value[property + 'Left'] || ''
  const r = lock.x ? x : value[key + 'r'] || value[property + 'Right'] || ''

  /*
  mx = mx || marginX || ''
  my = my || marginY || ''
  mt = lock.y ? my || marginY || '' : mt || marginTop || ''
  mb = lock.y ? my || marginY || '' : mb || marginBottom || ''
  ml = lock.x ? mx || marginX || '' : ml || marginLeft || ''
  mr = lock.x ? mx || marginX || '' : mr || marginRight || ''
  */

  useEffect(() => {
    if (typeof x === 'number') setLock(lock => ({ ...lock, x: true }))
    if (typeof y === 'number') setLock(lock => ({ ...lock, y: true }))
  }, [])

  const handleChange = direction => n => {
    const val = n === '' ? undefined : parseInt(n)
    switch (direction) {
      case 't':
        if (lock.y) onChange({ [key + 'y']: val })
        else onChange({ [key + 't']: val })
        break
      case 'b':
        if (lock.y) onChange({ [key + 'y']: val })
        else onChange({ [key + 'b']: val })
        break
      case 'l':
        if (lock.x) onChange({ [key + 'x']: val })
        else onChange({ [key + 'l']: val })
        break
      case 'r':
        if (lock.x) onChange({ [key + 'x']: val })
        else onChange({ [key + 'r']: val })
        break
    }
  }

  const onChangeLock = dir => e => {
    const isX = dir === 'x'
    if (!lock[dir]) {
      setLock(lock => ({ ...lock, [dir]: true }))
      const val = isX ? (l || r) : (t || b)
      onChange({
        [key + isX ? 'l' : 't']: undefined,
        [key + isX ? 'r' : 'b']: undefined,
        [key + dir]: val,
      })
    } else {
      setLock(lock => ({ ...lock, [dir]: false }))
      const val = dir === 'x' ? x : y
      onChange({
        [key + isX ? 'l' : 't']: undefined,
        [key + isX ? 'r' : 'b']: undefined,
        [key + dir]: val,
      })
    }
  }

  const prefixName = name => tag ? `styles.${tag}.${key}${name}` : key + name
  const label = dir => property === 'margin' ? 'Margin ' + dir : 'Padding ' + dir

  return (
    <div
      sx={{
        display: 'grid',
        gridGap: 2,
        gridTemplateColumns: 'repeat(3, 1fr)',
        alignItems: 'center',
      }}>
      <Field
        type="number"
        name={prefixName('l')}
        label={label("Left")}
        value={l}
        onChange={handleChange('l')}
      />
      <div
        sx={{
          display: 'grid',
          gridGap: 2,
        }}>
        <Field
          type="number"
          name={prefixName('t')}
          label={label("Top")}
          value={t}
          onChange={handleChange('t')}
        />
        <div>
          <label>
            <input
              type="checkbox"
              checked={lock.x}
              onChange={onChangeLock('x')}
            />
            Lock x-axis
          </label>
          <label>
            <input
              type="checkbox"
              checked={lock.y}
              onChange={onChangeLock('y')}
            />
            Lock y-axis
          </label>
        </div>
        <Field
          type="number"
          name={prefixName('b')}
          label={label("Bottom")}
          value={b}
          onChange={handleChange('b')}
        />
      </div>
      <Field
        type="number"
        name={prefixName('r')}
        label={label("Right")}
        value={r}
        onChange={handleChange('r')}
      />
    </div>
  )
}

export default SxSpace
