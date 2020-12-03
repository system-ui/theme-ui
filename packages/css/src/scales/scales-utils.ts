export const unsafeKeys = Object.keys as <T extends object>(
  x: T
) => Array<keyof T>

export const makeScaleMapping = <K extends string, N extends string>(
  properties: K[],
  scaleName: N
): Record<K, N> => {
  const res = {} as Record<K, N>
  for (const key of properties) {
    res[key] = scaleName
  }
  return res
}
