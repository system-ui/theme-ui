import React from 'react'
import PrismCodeBlock from '@theme-ui/prism'

export default {
  pre: ({ children }) => <>{children}</>,
  code: PrismCodeBlock
}
