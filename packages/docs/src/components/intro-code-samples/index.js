// @ts-check
import React from 'react'
import Snippet from '@theme-ui/prism'

import themeCreationRaw from '!!raw-loader!./snippets/theme.tsx'
import basicUsageRaw from '!!raw-loader!./snippets/basic-usage.tsx'

const IntroCodeSamples = {
  ThemeCreation() {
    return <Snippet className="language-tsx" children={themeCreationRaw} />
  },
  BasicUsage() {
    return <Snippet className="language-tsx" children={basicUsageRaw} />
  },
}

export default IntroCodeSamples
