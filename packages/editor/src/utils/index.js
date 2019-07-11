import merge from 'lodash.merge'
import debounce from 'lodash.debounce'

export const flattenObject = object => {
  const result = {}

  function flatten(obj, prefix = '') {
    Object.keys(obj).forEach(key => {
      const value = obj[key]
      if (typeof value === 'object') {
        flatten(value, `${prefix}${key}.`)
      } else {
        result[`${prefix}${key}`] = value
      }
    })
  }

  flatten(object)

  return result
}

export const runScript = script => {
  return new Promise((resolve, reject) => {
    debounce(window.chrome.devtools.inspectedWindow.eval, 100)(
      script,
      (result, err) => {
        if (err) {
          console.error(err)
          reject(err)
        }
        resolve(result)
      }
    )
  })
}

export const mergeState = (state, next) => merge({}, state, next)

export const makeHtmlSafeLabel = (text = '') => {
  return text
    .split('_')
    .map(w => w.replace(/./, m => m.toUpperCase()))
    .join('')
}
