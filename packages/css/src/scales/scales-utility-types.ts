import { FinalTheme } from '../types'

import { Iteration, Object } from 'ts-toolbelt'

/**
 * @internal
 */
export type StringOrNumber = string | number
/**
 * @internal
 */
export type TokenValue = StringOrNumber
/**
 * @internal
 */
export type IgnoredKeys = Exclude<keyof any[], number>

/**
 * @internal
 * dotted paths to all leafs in an object
 */
export type ScaleDottedPaths<
  O,
  I extends Iteration.Iteration = Iteration.IterationOf<'0'>
> = 9 extends Iteration.Pos<I>
  ? never
  : {
      [K in keyof O & StringOrNumber]: K extends IgnoredKeys
        ? never
        : O[K] extends null | undefined
        ? never
        : O[K] extends TokenValue
        ? `${K}`
        : `${K}.${ScaleDottedPaths<O[K], Iteration.Next<I>>}`
    }[keyof O & StringOrNumber]

/**
 * @internal
 * turns `string` to `string & {}` which can be part of a union
 * we use this to allow autocomplete on css globals in non-strict mode
 */
export type StringHack<T> = string extends T
  ? Exclude<T, string> | (string & {})
  : T

/**
 * @internal
 */
export type AllowedStrings = Object.Path<
  FinalTheme,
  ['options', 'strictMode', 'allowStrings']
>

/**
 * @internal
 */
// TODO: test it
export type StringEscapeHatch = AllowedStrings extends false
  ? never
  : string & {}

/**
 * @internal
 * if T contains stringified `${number}`, we add normal `number` for convenience
 */
export type AddNumberForConvenience<T> = `${number}` extends T ? T | number : T

export type ScaleProperty<TScale> =
  | StringEscapeHatch
  | AddNumberForConvenience<
      StringHack<ScaleDottedPaths<Exclude<TScale, undefined>>>
    >
