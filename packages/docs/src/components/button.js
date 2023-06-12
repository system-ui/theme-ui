/**
 * @param {React.ComponentPropsWithoutRef<"button">} props
 */
export default function DocsButton(props) {
  return (
    <button
      {...props}
      sx={{
        appearance: 'none',
        fontFamily: 'inherit',
        fontSize: 1,
        fontWeight: 'bold',
        m: 0,
        px: 2,
        py: 2,
        color: 'text',
        bg: 'muted',
        border: 0,
        borderRadius: 2,
        cursor: 'pointer',
      }}
    />
  )
}
