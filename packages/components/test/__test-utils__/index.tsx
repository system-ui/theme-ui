import { makeTheme } from '@theme-ui/css/utils'

import { matchers } from '@emotion/jest'

expect.extend(matchers)

export const theme = makeTheme({
  boxes: {
    beep: {
      p: 4,
      bg: 'highlight',
    },
  },
  cards: {
    primary: {
      p: 3,
      bg: 'muted',
      borderRadius: 4,
    },
  },
  buttons: {
    primary: {
      color: 'background',
      bg: 'primary',
    },
  },
  text: {
    default: {
      fontSize: 3,
    },
    block: {
      my: 0,
      maxWidth: [0, '48em'],
      variant: 'default',
      textAlign: 'justify',
      textAlignLast: 'start',
      textJustify: 'auto',
    },
    heading: {
      fontSize: 5,
    },
  },
  images: {
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 99999,
    },
  },
  links: {
    nav: {
      textDecoration: 'none',
      color: 'inherit',
      fontWeight: 'normal',
    },
  },
})
