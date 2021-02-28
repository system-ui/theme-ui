// export {}


// import { Assert, IsExact } from '@theme-ui/test-utils'
// import { Scales, makeTheme } from '../src'

// const myTheme = makeTheme({
//   colors: {
//     gray: {
//       50: 'rgb(8, 8, 8)',
//       75: 'rgb(26, 26, 26)',
//       100: 'rgb(30, 30, 30),',
//       150: null as null,
//       200: undefined as undefined,
//     },
//   }
// })

// type MyTheme = typeof myTheme

// declare module '../src' {
//   export interface UserTheme extends MyTheme {}
// }

// type _1 = Exclude<Scales.Color , 'currentColor'>

// type _2 = Assert<
//   IsExact<
//     Scales.Color,
//     number | (string & {}) | "gray.50" | "gray.75" | "gray.100" | "currentColor"
//   >,
//   true
// >
