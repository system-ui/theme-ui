/** @jsxRuntime automatic */
/** @jsxImportSource theme-ui */
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { InitializeColorMode } from 'theme-ui'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <InitializeColorMode />
          <div
            sx={{ border: '1px solid', borderColor: 'text', padding: '1em' }}
          >
            <Main />
          </div>
          <NextScript />
        </body>
      </Html>
    )
  }
}
