declare module 'modularscale' {
  type RatioLiteral =
    | 'minor second'
    | 'major second'
    | 'minor third'
    | 'major third'
    | 'augmented fourth'
    | 'perfect fifth'
    | 'minor sixth'
    | 'golden'
    | 'phi'
    | 'major sixth'
    | 'minor seventh'
    | 'major seventh'
    | 'octave'
    | 'major tenth'
    | 'major eleventh'
    | 'major twelfth'
    | 'double octave'

  function modularscale(value: number): number
  function modularscale(value: number, ratio: number): number
  function modularscale(value: number, ratio: RatioLiteral): number

  export default modularscale
  export type { RatioLiteral }
}
