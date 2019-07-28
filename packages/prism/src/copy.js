import React, { useState } from 'react'

import copyToClipboard from '../utils/copy-to-clipboard'

const delay = duration => new Promise(resolve => setTimeout(resolve, duration))

function Copy({
  className,
  content,
  duration = 5000,
  fileName = ``,
  trim = false,
}) {
  const [copied, setCopied] = useState(false)

  const label = copied
    ? `${fileName ? fileName + ` ` : ``}copied to clipboard`
    : `${fileName ? fileName + `: ` : ``}copy code to clipboard`

  return (
    <button
      name={label}
      className={className}
      disabled={copied}
      sx={{
        variant: 'prism.copyButton',
      }}
      onClick={async () => {
        await copyToClipboard(trim ? content.trim() : content)

        setCopied(true)

        await delay(duration)

        setCopied(false)
      }}>
      {copied ? `Copied` : `Copy`}
      {/* <ScreenReaderText aria-roledescription="status">{label}</ScreenReaderText> */}
    </button>
  )
}

export default Copy
