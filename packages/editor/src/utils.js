export const makeHtmlSafeLabel = (text = '') => {
  return text
    .split('_')
    .map(w => w.replace(/./, m => m.toUpperCase()))
    .join('')
}
