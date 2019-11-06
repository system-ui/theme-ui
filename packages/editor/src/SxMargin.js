/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState, useEffect } from 'react'
import Field from './Field'

export const SxMargin = ({
  tag,
  value: {
    mt,
    mb,
    ml,
    mr,
    mx,
    my,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginX,
    marginY,
  } = {},
  onChange,
}) => {
  const [lock, setLock] = useState({ x: false, y: false })
  mx = mx || marginX || ''
  my = my || marginY || ''
  mt = lock.y ? my || marginY || '' : mt || marginTop || ''
  mb = lock.y ? my || marginY || '' : mb || marginBottom || ''
  ml = lock.x ? mx || marginX || '' : ml || marginLeft || ''
  mr = lock.x ? mx || marginX || '' : mr || marginRight || ''

  useEffect(() => {
    if (typeof mx === 'number') setLock(l => ({ ...l, x: true }))
    if (typeof my === 'number') setLock(l => ({ ...l, y: true }))
  }, [])

  const handleChange = direction => n => {
    const val = n === '' ? undefined : parseInt(n)
    switch (direction) {
      case 't':
        if (lock.y) onChange({ my: val })
        else onChange({ mt: val })
        break
      case 'b':
        if (lock.y) onChange({ my: val })
        else onChange({ mb: val })
        break
      case 'l':
        if (lock.x) onChange({ mx: val })
        else onChange({ ml: val })
        break
      case 'r':
        if (lock.x) onChange({ mx: val })
        else onChange({ mr: val })
        break
    }
  }

  const prefixName = name => tag ? `styles.${tag}.${name}` : name

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
        name={prefixName('ml')}
        label="Margin Left"
        value={ml || ''}
        onChange={handleChange('l')}
      />
      <div
        sx={{
          display: 'grid',
          gridGap: 2,
        }}>
        <Field
          type="number"
          name={prefixName('mt')}
          label="Margin Top"
          value={mt}
          onChange={handleChange('t')}
        />
        <div>
          <label>
            <input
              type="checkbox"
              checked={lock.x}
              onChange={e => {
                if (!lock.x) {
                  setLock(l => ({ ...l, x: true }))
                  const val = ml || mr
                  onChange({
                    ml: undefined,
                    mr: undefined,
                    mx: val,
                  })
                } else {
                  setLock(l => ({ ...l, x: false }))
                  const val = mx
                  onChange({
                    ml: val,
                    mr: val,
                    mx: undefined,
                  })
                }
              }}
            />
            Lock x-axis
          </label>
          <label>
            <input
              type="checkbox"
              checked={lock.y}
              onChange={e => {
                if (!lock.y) {
                  const val = mt || mb
                  setLock(l => ({ ...l, y: true }))
                  onChange({
                    my: val,
                    mt: undefined,
                    mb: undefined,
                  })
                } else {
                  const val = my
                  setLock(l => ({ ...l, y: false }))
                  onChange({
                    my: undefined,
                    mt: val,
                    mb: val,
                  })
                }
              }}
            />
            Lock y-axis
          </label>
        </div>
        <Field
          type="number"
          name={prefixName('mb')}
          label="Margin Bottom"
          value={mb}
          onChange={handleChange('b')}
        />
      </div>
      <Field
        type="number"
        name={prefixName('mr')}
        label="Margin Right"
        value={mr}
        onChange={handleChange('r')}
      />
    </div>
  )
}

export default SxMargin
