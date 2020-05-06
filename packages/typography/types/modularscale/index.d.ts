// Temporary augmentation, waiting for DT PR
// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/44512
// TODO: Replace with official types
declare module 'modularscale' {
  export = modularscale;
    function modularscale(value: number, ratio?: number | modularscale.RatioLiteral): number

    namespace modularscale {
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
  }
}
