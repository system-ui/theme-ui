import * as React from 'react'

export function useColorMode<T = string>(): [
  T,
  (val: T | ((_: T) => T)) => void
]
export const InitializeColorMode: () => JSX.Element
export const ColorModeProvider: React.FC
