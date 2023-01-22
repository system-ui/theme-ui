import Head from 'next/head'
import About from '../components/about.mdx'
import { Global } from 'theme-ui'

export default function Page() {
  return (
    <>
      <Head>
        <title>Next.js Theme UI</title>
      </Head>
      <Global styles={{ h1: { color: 'salmon !important' } }} />
      <About />
    </>
  )
}
