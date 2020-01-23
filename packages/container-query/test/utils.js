import { getBreakpointIndex, unit2px, em2px, rem2px } from '../src/utils'

describe('getBreakpointIndex', () => {
  test('width is less than the min breakpoint', () => {
    expect(getBreakpointIndex([480, 640, 1024], 320)).toEqual(0)
  })

  test('width is equal to the min breakpoint', () => {
    expect(getBreakpointIndex([480, 640, 1024], 480)).toEqual(0)
  })

  test('width is in the range, on the left side', () => {
    expect(getBreakpointIndex([480, 640, 1024], 520)).toEqual(1)
  })

  test('width is bigger than the max breakpoint', () => {
    expect(getBreakpointIndex([480, 640, 1024], 1280)).toEqual(3)
  })

  test('width is equal to the max breakpoint', () => {
    expect(getBreakpointIndex([480, 640, 1024], 1024)).toEqual(2)
  })

  test('width is in the range, on the right side', () => {
    expect(getBreakpointIndex([480, 640, 1024], 960)).toEqual(2)
  })

  test('array is empty', () => {
    expect(getBreakpointIndex([], 960)).toEqual(0)
  })
})

describe('unit2px', () => {
  window.getComputedStyle = jest.fn().mockImplementation(prop => prop)

  Object.defineProperty(document, 'documentElement', {
    get: () => ({
      fontSize: '20px',
    }),
  })

  test('em2px helper', () => {
    const el = {
      parentNode: {
        fontSize: '16px',
      },
    }
    expect(em2px(el, '10em')).toEqual(160)
  })

  test('rem2px helper', () => {
    expect(rem2px('10rem')).toEqual(200)
  })

  test('test em unit, default font-size', () => {
    const el = {
      parentNode: {
        fontSize: '16px',
      },
    }
    expect(unit2px(el, '10em')).toEqual(160)
  })

  test('test em unit, custom font-size', () => {
    const el = {
      parentNode: {
        fontSize: '18px',
      },
    }
    expect(unit2px(el, '10em')).toEqual(180)
  })

  test('test rem unit', () => {
    expect(unit2px(null, '20rem')).toEqual(400)
    expect(unit2px(null, '40rem')).toEqual(800)
  })

  test('test rem unit', () => {
    expect(unit2px(null, '20rem')).toEqual(400)
    expect(unit2px(null, '40rem')).toEqual(800)
  })

  test('test unknown unit', () => {
    expect(unit2px(null, '10vh')).toEqual('10vh')
  })
})
