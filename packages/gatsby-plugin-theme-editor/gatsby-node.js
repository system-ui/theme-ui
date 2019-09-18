const fs = require('fs')
const path = require('path')
const util = require('util')
const bodyParser = require('body-parser')

const write = util.promisify(fs.writeFile)

exports.createPages = ({ actions }) => {
  if (process.env.NODE_ENV === 'production') return
  actions.createPage({
    path: '/___theme',
    component: require.resolve('./src/edit'),
  })
}

exports.onCreateDevServer = ({ app, store }) => {
  const state = store.getState()
  const dirname = path.join(
    state.program.directory,
    'src',
    'gatsby-plugin-theme-ui'
  )
  const filename = path.join(dirname, 'theme.json')

  if (!fs.existsSync(dirname)) {
    console.warn(
      'gatsby-plugin-theme-editor requires gatsby-plugin-theme-ui.',
      'Please ensure the `src/gatsby-plugin-theme-ui` directory exists.'
    )
  }

  console.log({ dirname, filename })
  app.use(bodyParser.json())
  app.post('/___theme', async (req, res) => {
    const { theme } = req.body
    if (!theme) {
      res.status(500).send({
        error: 'Did not receive theme',
      })
      return
    }
    console.log('saving theme')
    await write(filename, theme)
    res.send('ok beep')
  })
}
