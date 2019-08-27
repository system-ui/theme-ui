/** @jsx jsx */
import { useState, useRef } from 'react'
import { jsx } from 'theme-ui'
import copyToClipboard from 'copy-to-clipboard'

import Button from './Button'

const CopyThemeToClipboard = ({ theme }) => {
  const [copied, setCopied] = useState(false)
  const timer = useRef(false)

  const handleClick = () => {
    setCopied(true)
    copyToClipboard(JSON.stringify(theme))
    clearInterval(timer.current)
    timer.current = setInterval(() => setCopied(false), 1000)
  }

  return (
    <Button onClick={handleClick}>
      {copied ? 'Copied!' : 'Copy JSON theme to clipboard'}
    </Button>
  )
}

export default CopyThemeToClipboard
