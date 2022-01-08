import { Html, Head, Main, NextScript } from 'next/document'
import { InitializeColorMode } from 'theme-ui'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <InitializeColorMode />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
