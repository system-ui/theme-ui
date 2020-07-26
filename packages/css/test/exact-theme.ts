import { Theme, css } from '@theme-ui/css'

const makeTheme = <T extends Theme>(t: T) => t

const myTheme = makeTheme({
  colors: {
    primary: 'red',
    'primary-dark': 'darkred',
  },
})

type MyTheme = typeof myTheme

declare module '@theme-ui/css' {
  export interface UserTheme extends MyTheme {}
}

// css({
//   color: 'hotpink',
// })
