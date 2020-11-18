import renderer from 'react-test-renderer'

export const renderJSON = (
  el: Parameters<typeof renderer.create>[0]
): renderer.ReactTestRendererJSON => {
  const json = renderer.create(el).toJSON()
  if (Array.isArray(json)) {
    return json[0]
  }

  if (!json) {
    throw new Error(`${json} was rendered by renderJSON`)
  }

  return json
}
