import React from 'react'
import { ThemeProvider } from 'theme-ui'

import Header from '../components/Header'
import { theme } from '../src/theme'

/**
 * @see https://nextjs.org/docs/advanced-features/custom-app
 * @see https://nextjs.org/docs/basic-features/typescript#custom-app
 * @param props {import("next/app").AppProps}
 */
export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
