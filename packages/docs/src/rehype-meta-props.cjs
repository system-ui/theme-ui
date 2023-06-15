const visit = require('unist-util-visit-2')

const META_ATTR_REGEX = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g

/** @type {import('unified').Plugin<Array<void>, import('hast').Root>} */
function rehypeMetaAsAttributes() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'code' && node.data && node.data.meta) {
        META_ATTR_REGEX.lastIndex = 0 // Reset regex.

        let match
        while ((match = META_ATTR_REGEX.exec(node.data.meta))) {
          node.properties[match[1]] = match[2] || match[3] || match[4] || ''
        }
      }
    })
  }
}

module.exports = { rehypeMetaAsAttributes }
