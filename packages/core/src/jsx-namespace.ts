import { SxProp } from './types'

export type WithConditionalSxProp<P> = { className: string } extends P
  ? Omit<P, keyof SxProp> & SxProp
  : Omit<P, keyof SxProp>

type ReactJSXElement = JSX.Element
type ReactJSXElementClass = JSX.ElementClass
type ReactJSXElementAttributesProperty = JSX.ElementAttributesProperty
type ReactJSXElementChildrenAttribute = JSX.ElementChildrenAttribute
type ReactJSXLibraryManagedAttributes<C, P> = JSX.LibraryManagedAttributes<C, P>
type ReactJSXIntrinsicAttributes = JSX.IntrinsicAttributes
type ReactJSXIntrinsicClassAttributes<T> = JSX.IntrinsicClassAttributes<T>
type ReactJSXIntrinsicElements = JSX.IntrinsicElements

export declare namespace ThemeUIJSX {
  export interface Element extends ReactJSXElement {}
  export interface ElementClass extends ReactJSXElementClass {}
  export interface ElementAttributesProperty
    extends ReactJSXElementAttributesProperty {}
  export interface ElementChildrenAttribute
    extends ReactJSXElementChildrenAttribute {}
  export type LibraryManagedAttributes<C, P> = WithConditionalSxProp<P> &
    ReactJSXLibraryManagedAttributes<C, P>
  export interface IntrinsicAttributes extends ReactJSXIntrinsicAttributes {}
  export interface IntrinsicClassAttributes<T>
    extends ReactJSXIntrinsicClassAttributes<T> {}
  export type IntrinsicElements = {
    [K in keyof ReactJSXIntrinsicElements]: ReactJSXIntrinsicElements[K] &
      SxProp
  }
}
