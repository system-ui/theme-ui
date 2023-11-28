export default (props) => (
  <aside
    {...props}
    sx={{
      // fontWeight: 'bold',
      padding: 3,
      bg: 'highlight',
      borderRadius: 4,
      borderLeft: (t) => `8px solid ${t.colors.primary}`,
      p: {
        m: 0,
      },
    }}
  />
)
