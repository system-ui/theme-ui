import type { SxProp } from './types'
import type { JSX as ReactJSX } from 'react'

type WithConditionalSxProp<P> = 'className' extends keyof P
  ? string extends P['className']
    ? P & SxProp
    : P
  : P

export declare namespace ThemeUIJSX {
  export type Element = ReactJSX.Element
  export type ElementType = ReactJSX.ElementType
  export type ElementClass = ReactJSX.ElementClass
  export type ElementAttributesProperty = ReactJSX.ElementAttributesProperty
  export type ElementChildrenAttribute = ReactJSX.ElementChildrenAttribute
  export type LibraryManagedAttributes<C, P> = WithConditionalSxProp<P> &
    // We are not removing incompatible `sx` props, because touching this breaks
    // inference in generic components.
    // Yes, we steal any prop called `sx` at runtime, but we
    // can't represent it on type level without breaking compatibility with
    // our own Field, react-hook-form, and a bunch of other generic components.
    // Don't touch ReactJSXLibraryManagedAttributes or you'll spend hours
    // debugging and entirely spoil your day.
    ReactJSX.LibraryManagedAttributes<C, P>
  export type IntrinsicAttributes = ReactJSX.IntrinsicAttributes
  export type IntrinsicClassAttributes<T> = ReactJSX.IntrinsicClassAttributes<T>
  export type IntrinsicElements = {
    [K in keyof ReactJSX.IntrinsicElements]: ReactJSX.IntrinsicElements[K] &
      SxProp
  }
}
