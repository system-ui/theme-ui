import React from 'react'

import CodeBlock from './code-block'

export default {
  pre: ({ children }) => <>{children}</>,
  code: CodeBlock,
}
