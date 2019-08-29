/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState, useRef, useEffect } from 'react'

const keys = {
  38: 'up',
  40: 'down',
  27: 'escape',
  13: 'return',
}

const Chevron = props => (
  <svg
    viewBox="0 0 16 16"
    width="16"
    height="16"
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

export default ({
  type = 'text',
  name,
  label,
  value,
  onChange,
  options = [],
  ...props
}) => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(-1)
  const root = useRef(null)
  const input = useRef(null)

  useEffect(() => {
    const handleOutsideClick = e => {
      if (root.current && root.current.contains(e.target)) return
      setOpen(false)
    }
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [root.current])

  const popup = name + '-popup'

  const handleKeyDown = e => {
    if (e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) return
    switch (keys[e.keyCode]) {
      case 'up':
        if (index < 0) setIndex(options.length - 1)
        else setIndex(index - 1)
        break
      case 'down':
        if (!open) setOpen(true)
        setIndex((index + 1) % options.length)
        break
      case 'return':
        const val = options[index]
        if (val) onChange(val)
        setOpen(false)
        break
      case 'escape':
        setOpen(false)
        setIndex(-1)
        break
    }
  }

  const handleChange = e => {
    onChange(e.target.value)
  }

  const toggleOpen = e => {
    setOpen(!open)
    if (input.current) input.current.focus()
  }
  const handleItemClick = i => e => {
    const val = options[i]
    if (val) onChange(val)
    setOpen(false)
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
      <label
        htmlFor={name}
        sx={{
          display: 'block',
          fontWeight: 'bold',
          fontSize: 0,
        }}>
        {label}
      </label>
      <div
        sx={{
          display: 'flex',
        }}>
        <input
          {...props}
          ref={input}
          role="combobox"
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          aria-autocomplete="none"
          aria-haspopup="true"
          aria-owns={popup}
          aria-expanded={open}
          aria-activedescendant={name + index}
          sx={{
            appearance: 'none',
            width: '100%',
            height: 32,
            fontFamily: 'inherit',
            fontSize: 16,
            p: 1,
            m: 0,
            border: '1px solid',
            borderColor: 'gray',
            ':focus': {
              borderColor: 'primary',
              outline: 'none',
            },
          }}
        />
        <button
          tabindex="-1"
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
        tabindex="-1"
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '100%',
          listStyle: 'none',
          p: 0,
          m: 0,
          bg: 'background',
          border: '1px solid',
          borderColor: 'gray',
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
                bg: index === i ? 'highlight' : null,
                userSelect: 'none',
                ':hover': {
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
