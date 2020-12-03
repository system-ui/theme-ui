import { SpaceScaleMultiples, spaceScaleMultiples } from './scales/space'
import { SizesScaleMultiples, sizesScaleMultiples } from './scales/sizes'

export const multiples = {
  ...spaceScaleMultiples,
  ...sizesScaleMultiples,
}

export interface MultiplesCSSProperties
  extends SpaceScaleMultiples,
    SizesScaleMultiples {}
