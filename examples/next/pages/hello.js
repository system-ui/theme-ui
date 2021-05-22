/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Themed } from 'theme-ui'

export default function Hello() {
  return (
    <div
      sx={{
        maxWidth: 1024,
        mx: 'auto',
        p: 3,
      }}>
      <Themed.h1>Hello</Themed.h1>
    </div>
  )
}
