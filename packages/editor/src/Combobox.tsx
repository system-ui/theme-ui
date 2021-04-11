/** @jsx jsx */
import { jsx, SxProp } from 'theme-ui'
import { useState, useRef, useEffect } from 'react'
import { Label, Input, InputProps } from '@theme-ui/components'

const Chevron = () => (
  <svg
    viewBox="0 0 16 16"
    width="12"
    height="12"
    sx={{
      pointerEvents: 'none',
    }}>
    <path
      stroke="currentcolor"
      strokeWidth="2"
      fill="none"
      d="M14 6 L8 12 L2 6"
    />
  </svg>
)

const keys: { [k: number]: string } = {
  38: 'up',
  40: 'down',
  27: 'escape',
  13: 'return',
}

type ComboboxOwnProps<T> = {
  type?: string
  name: string
  label?: React.ReactNode
  value: T | undefined
  onChange: (val: string | T) => void
  options?: T[]
}
export interface ComboboxProps<T>
  extends ComboboxOwnProps<T>,
    Omit<InputProps, keyof ComboboxOwnProps<T> | keyof SxProp>,
    SxProp {}

const Combobox = <T extends string | number>({
  type = 'text',
  name,
  label,
  value,
  onChange,
  options = [],
  ...props
}: ComboboxProps<T>) => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(-1)
  const root = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (root.current && root.current.contains(e.target as Node)) return
      setOpen(false)
    }
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [root.current])

  useEffect(() => {
    resetIndex()
  }, [value])

  const popup = name + '-popup'

  const resetIndex = () => {
    const i = options.indexOf(value!)
    setIndex(i)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) return
    switch (keys[e.keyCode]) {
      case 'up':
        if (!open) setOpen(true)
        if (index < 1) setIndex(options.length - 1)
        else setIndex(index - 1)
        break
      case 'down':
        if (!open) setOpen(true)
        setIndex((index + 1) % options.length)
        break
      case 'return':
        if (!open) return
        const val = options[index]
        if (val) onChange(val)
        setOpen(false)
        break
      case 'escape':
        setOpen(false)
        resetIndex()
        break
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleBlur = () => {
    requestAnimationFrame(() => {
      if (root.current && root.current.contains(document.activeElement)) return
      setOpen(false)
    })
  }

  const toggleOpen = () => {
    setOpen(!open)
    if (input.current) input.current.focus()
  }

  const handleItemClick = (i: number) => () => {
    const val = options[i]
    if (val) onChange(val)
    setOpen(false)
    input.current && input.current.select()
  }

  return (
    <div
      ref={root}
      style={{
        position: open ? 'relative' : 'static',
      }}
      sx={{
        zIndex: 2,
      }}>
      <Label htmlFor={name}>{label || name}</Label>
      <div
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}>
        <Input
          {...props}
          ref={input}
          role="combobox"
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          aria-autocomplete="none"
          aria-haspopup="true"
          aria-owns={popup}
          aria-expanded={open}
          aria-activedescendant={name + index}
        />
        <button
          tabIndex={-1}
          aria-label={open ? 'Close' : 'Open'}
          onClick={toggleOpen}
          sx={{
            appearance: 'none',
            width: 32,
            height: 32,
            color: 'inherit',
            bg: 'transparent',
            border: 0,
            ml: -32,
          }}>
          <Chevron />
        </button>
      </div>
      <ul
        id={popup}
        role="listbox"
        aria-label={name}
        tabIndex={-1}
        style={{
          visibility: open ? 'visible' : 'hidden',
          position: open ? 'absolute' : 'static',
        }}
        sx={{
          left: 0,
          right: 0,
          top: '100%',
          listStyle: 'none',
          p: 0,
          m: 0,
          maxHeight: 512,
          overflowY: 'auto',
          bg: 'white',
          color: 'black',
          border: '1px solid',
          borderTop: 0,
          borderColor: 'lightgray',
        }}>
        {open &&
          options.map((option, i) => (
            <li
              key={option}
              role="option"
              aria-selected={i === index}
              onClick={handleItemClick(i)}
              sx={{
                p: 1,
                userSelect: 'none',
                '&[aria-selected=true],:hover': {
                  bg: 'highlight',
                },
              }}>
              {option}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Combobox
