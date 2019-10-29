/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState, useEffect } from 'react'
import { useEditor } from './context'
import Combobox from './Combobox'
import Field from './Field'
import { defaultSpace } from './defaults'
import ThemeColorPicker from './ThemeColorPicker'

export const Margin = ({
  tag,
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
    const val = n === '' ? undefined : n
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
        name={`styles.${tag}.ml`}
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
          name={`styles.${tag}.mt`}
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
          name={`styles.${tag}.mb`}
          label="Margin Bottom"
          value={mb}
          onChange={handleChange('b')}
        />
      </div>
      <Field
        type="number"
        name={`styles.${tag}.mr`}
        label="Margin Right"
        value={mr}
        onChange={handleChange('r')}
      />
    </div>
  )
}

export default ({ tag = 'root' }) => {
  const context = useEditor()
  const {
    styles = {},
    colors = {},
    fonts = {},
    fontSizes = [],
    lineHeights = {},
    fontWeights = {},
    space = defaultSpace,
  } = context.theme

  const style = styles[tag] || {}

  const setStyle = next => {
    context.setTheme({
      styles: {
        [tag]: {
          ...style,
          ...next,
        },
      },
    })
  }

  return (
    <div>
      <b>theme.styles.{tag}</b>
      <Combobox
        name={`styles.${tag}.fontFamily`}
        label="Font Family"
        value={style.fontFamily || ''}
        onChange={fontFamily => {
          setStyle({ fontFamily })
        }}
        options={['inherit', ...Object.keys(fonts)]}
      />
      <div
        sx={{
          display: 'grid',
          gridGap: 2,
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}>
        <Field
          name={`styles.${tag}.fontSize`}
          label="Font Size"
          value={style.fontSize || ''}
          type="number"
          onChange={val => {
            const fontSize = Number(val)
            setStyle({ fontSize })
          }}
        />
        <Combobox
          name={`styles.${tag}.fontWeight`}
          label="Font Weight"
          value={style.fontWeight || ''}
          onChange={fontWeight => {
            setStyle({ fontWeight })
          }}
          options={['inherit', ...Object.keys(fontWeights)]}
        />
        <Combobox
          name={`styles.${tag}.lineHeight`}
          label="Line Height"
          value={style.lineHeight || ''}
          onChange={lineHeight => {
            setStyle({ lineHeight })
          }}
          options={['inherit', ...Object.keys(lineHeights)]}
        />
      </div>
      <Margin
        {...style}
        onChange={next => {
          setStyle(next)
        }}
      />
      <div
        sx={{
          display: 'grid',
          gridGap: 2,
          gridTemplateColumns: 'repeat(2, 1fr)',
          my: 3,
        }}>
        <div
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <ThemeColorPicker
            value={style.color || ''}
            onChange={color => {
              setStyle({ color })
            }}
          />
          <div sx={{ fontWeight: 'bold', ml: 2 }}>Color</div>
        </div>
        <div
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <ThemeColorPicker
            value={style.bg || ''}
            onChange={bg => {
              setStyle({ bg })
            }}
          />
          <div sx={{ fontWeight: 'bold', ml: 2 }}>Background Color</div>
        </div>
      </div>
    </div>
  )
}
