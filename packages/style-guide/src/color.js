import Color from 'color'

export const toHex = raw => {
  try {
    return Color(raw).hex()
  } catch (e) {
    return
  }
}

export const toRGB = raw => {
  try {
    return Color(raw)
      .rgb()
      .string()
  } catch (e) {
    return
  }
}

export const toHSL = raw => {
  try {
    return Color(raw)
      .hsl()
      .string()
  } catch (e) {
    return
  }
}
