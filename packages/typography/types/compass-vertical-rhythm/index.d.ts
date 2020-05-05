declare module 'compass-vertical-rhythm' {
  import { VerticalRhythm as _VerticalRhythm } from 'typography'

  // Typography adds `scale` to base VerticalRhythm in its ctor...
  // See https://github.com/KyleAMathews/typography.js/blob/33d86df7e0d7f44cd1a71c8bd8791bdb71a7ecc5/packages/typography/src/index.js#L47
  interface VerticalRhythm extends Omit<_VerticalRhythm, 'scale'> {}

  interface VerticalRhythmOptions {
    baseFontSize?: string | number
    baseLineHeight?: string | number
    minLinePadding?: string | number
    roundToNearestHalfLine?: boolean
    // TODO: better type this (possible units)
    rhythmUnit?: string
  
    // TODO: check, is that still used ?
    defaultRhythmBorderWidth?: string
    defaultRhythmBorderStyle?: string
  }

  function verticalRhythm(opts?: VerticalRhythmOptions): VerticalRhythm

  export default verticalRhythm
  export type { VerticalRhythmOptions, VerticalRhythm }
}
