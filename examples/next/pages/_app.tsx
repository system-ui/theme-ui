/** @jsxImportSource theme-ui */
import { ThemeProvider } from 'theme-ui'

import Header from '../components/Header'
import { theme } from '../lib/theme'
import type { AppProps } from 'next/app'

/**
 * @see https://nextjs.org/docs/advanced-features/custom-app
 * @see https://nextjs.org/docs/basic-features/typescript#custom-app
 */
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <main
        sx={{
          border: '1px solid',
          borderColor: 'text',
          padding: 3,
          borderRadius: 1,
          maxWidth: 768,
          mx: 'auto',
        }}
      >
        <Header />
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  )
}
