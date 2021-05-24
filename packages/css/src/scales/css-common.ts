import type { Globals as CSSGlobals } from 'csstype'

// We add null and false values for convenience.
// `color: isActive && 'blue'` syntax common in JS projects
export type Globals = CSSGlobals | null | false | undefined

// DataType is not exported from `csstype`, and we need to do some slight
// modifications to it for performance and correctness
// Refer to MDN and csstype DataType namespace
export declare namespace DataType {
  export type LineStyle =
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'hidden'
    | 'inset'
    | 'none'
    | 'outset'
    | 'ridge'
    | 'solid'

  // There are 'medium' | 'thick' | 'thin' builtins supported by CSS, but we
  // ignore them and use only the names from the theme.
  export type LineWidth<TLength> = TLength
}
