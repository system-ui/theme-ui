import React from 'react'
import Box from './Box'

export const Embed = React.forwardRef(({
  ratio = 16 / 9,
  src,
  frameBorder = 0,
  allowFullScreen = true,
  width = 560,
  height = 315,
  allow,
  ...props
}, ref) => (
  <Box
    {...props}
    __css={{
      width: '100%',
      height: 0,
      paddingBottom: (100 / ratio) + '%',
      position: 'relative',
      overflow: 'hidden',
    }}>
    <Box
      ref={ref}
      as='iframe'
      src={src}
      width={width}
      height={height}
      frameBorder={frameBorder}
      allowFullScreen={allowFullScreen}
      allow={allow}
      __css={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
        left: 0,
        border: 0
      }}
    />
  </Box>
))
