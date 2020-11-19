import renderer from 'react-test-renderer'

export const renderJSON = (
  el: Parameters<typeof renderer.create>[0]
): renderer.ReactTestRendererJSON | null => {
  const json = renderer.create(el).toJSON()
  if (Array.isArray(json)) {
    return json[0]
  }

  return json
}
