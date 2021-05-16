const visit = require('unist-util-visit')
const { createFilePath } = require('gatsby-source-filesystem')
const { urlResolve } = require('gatsby-core-utils')

const mdxResolverPassthrough = (fieldName) => async (
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

const parseProps = (meta) => {
  return meta.split(' ').reduce((a, prop) => {
    if (prop.split('=').length > 1) {
      const [key, value] = prop.split('=')
      a[key] = value
      return a
    }
    a[prop] = true
    return a
  }, {})
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
    const props = parseProps(meta || '')

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
let basePath = '/recipes'

exports.onPreBootstrap = ({}, opts = {}) => {
  if (opts.path) source = opts.path
  if (opts.basePath) basePath = opts.basePath
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  actions.createTypes(`interface Recipe @nodeInterface {
    id: ID!
    name: String!
    slug: String!
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
        slug: {
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
  const slug = urlResolve(basePath, filepath)

  await actions.createNode({
    id,
    name: node.frontmatter.name || filepath,
    slug,
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

exports.createPages = async ({ actions, graphql, reporter }, opts) => {
  console.log('gatsby-theme-code-recipes - createPages', { opts })

  if (!opts.basePath) return
  const result = await graphql(`
    {
      allMdxRecipe(sort: { fields: [name], order: DESC }) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  if (result.errors) reporter.panic(result.errors)

  const recipes = result.data.allMdxRecipe.edges.map((e) => e.node)

  recipes.forEach((r) => {
    actions.createPage({
      path: r.slug,
      component: require.resolve('./src/query'),
      context: {
        id: r.id,
      },
    })
  })
}
