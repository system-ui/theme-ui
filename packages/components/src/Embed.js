// @ts-check
import React from 'react'

import Box, { __isBoxStyledSystemProp } from './Box'
import { getProps } from './util'

const getContainerProps = getProps(__isBoxStyledSystemProp)
const getIframeProps = getProps((str) => !__isBoxStyledSystemProp(str))

/** @typedef {import("../index").EmbedProps} EmbedProps */
/** @type {React.ForwardRefExoticComponent<EmbedProps>} */
export const Embed = React.forwardRef(function Embed(
  {
    variant,
    sx,
    ratio = 16 / 9,
    src,
    frameBorder = 0,
    allowFullScreen = true,
    width = 560,
    height = 315,
    allow,
    ...rest
  },
  ref
) {
  return (
    <Box
      variant={variant}
      sx={sx}
      __css={{
        width: '100%',
        height: 0,
        paddingBottom: 100 / ratio + '%',
        position: 'relative',
        overflow: 'hidden',
      }}
      {...getContainerProps(rest)}>
      <Box
        ref={ref}
        as="iframe"
        src={src}
        width={width}
        height={height}
        frameBorder={frameBorder}
        allowFullScreen={allowFullScreen}
        allow={allow}
        {...getIframeProps(rest)}
        __css={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          bottom: 0,
          left: 0,
          border: 0,
        }}
      />
    </Box>
  )
})
