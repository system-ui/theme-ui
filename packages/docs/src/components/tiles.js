import { ThemeUIProvider } from 'theme-ui'

export default ({ columns = 3, width, ...props }) => {
  const gridTemplateColumns = width
    ? `repeat(auto-fit, minmax(${width}px, 1fr))`
    : ['auto', `repeat(${columns}, 1fr)`]

  return (
    <ThemeUIProvider
      theme={{
        styles: {
          ol: {
            listStyle: 'none',
            display: 'grid',
            gridTemplateColumns,
            gridGap: 4,
            p: 0,
            m: 0,
          },
          ul: {
            listStyle: 'none',
            display: 'grid',
            gridTemplateColumns,
            gridGap: 4,
            p: 0,
            m: 0,
          },
        },
      }}
    >
      <div {...props} />
    </ThemeUIProvider>
  )
}
