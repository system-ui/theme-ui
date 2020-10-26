import Color from 'color'

type ColorArgument = ConstructorParameters<typeof Color>[0]
export const toHex = (raw: ColorArgument) => {
  try {
    return Color(raw).hex()
  } catch (e) {
    return
  }
}

export const toRGB = (raw: ColorArgument) => {
  try {
    return Color(raw)
      .rgb()
      .string()
  } catch (e) {
    return
  }
}

export const toHSL = (raw: ColorArgument) => {
  try {
    return Color(raw)
      .hsl()
      .string()
  } catch (e) {
    return
  }
}
