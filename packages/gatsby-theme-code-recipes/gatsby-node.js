const qs = require('querystring')
const visit = require('unist-util-visit')
const { createFilePath } = require('gatsby-source-filesystem')

const mdxResolverPassthrough = fieldName => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType('Mdx')
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  })
  const resolver = type.getFields()[fieldName].resolve
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  })
  return result
}

const resolveSnippets = async (source, args, context, info) => {
  const type = info.schema.getType('Mdx')
  const node = context.nodeModel.getNodeById({
    id: source.parent,
  })
  const resolver = type.getFields().mdxAST.resolve
  const ast = await resolver(node, args, context, {
    fieldName: 'mdxAST',
  })
  const snippets = []
  visit(ast, 'code', ({ lang, value, meta }) => {
    const props = qs.parse(meta || '')

    snippets.push({
      lang,
      value,
      meta,
      props,
    })
  })

  return snippets
}

let source = 'src/recipes'

exports.onPreBootstrap = ({}, opts = {}) => {
  if (opts.path) source = opts.path
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  actions.createTypes(`interface Recipe @nodeInterface {
    id: ID!
    name: String!
    body: String!
    snippets: [JSON]!
  }`)

  actions.createTypes(
    schema.buildObjectType({
      name: 'MdxRecipe',
      fields: {
        id: { type: 'ID!' },
        name: {
          type: 'String!',
        },
        snippets: {
          type: '[JSON]!',
          resolve: resolveSnippets,
        },
        body: {
          type: 'String!',
          resolve: mdxResolverPassthrough('body'),
        },
        mdxAST: {
          type: 'JSON!',
          resolve: mdxResolverPassthrough('mdxAST'),
        },
      },
      interfaces: ['Node', 'Recipe'],
    })
  )
}

exports.onCreateNode = async ({
  node,
  actions,
  getNode,
  createNodeId,
  loadNodeContent,
  createContentDigest,
}) => {
  if (node.internal.type !== 'Mdx') return
  const parent = getNode(node.parent)
  if (parent.sourceInstanceName !== source) return

  const id = createNodeId(`${node.id} >>> MdxRecipe`)
  const filepath = createFilePath({
    node: parent,
    getNode,
    basePath: source,
  })

  await actions.createNode({
    name: node.frontmatter.name || filepath,
    id,
    parent: node.id,
    children: [],
    internal: {
      type: 'MdxRecipe',
      contentDigest: createContentDigest(node.rawBody),
    },
    content: node.rawBody,
    description: 'Code recipes',
  })

  actions.createParentChildLink({
    parent: node,
    child: getNode(id),
  })
}
