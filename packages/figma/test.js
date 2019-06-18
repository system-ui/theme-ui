const fs = require('fs')
const path = require('path')
const test = require('ava')
const spawn = require('cross-spawn')
const parse = require('./index')

const testID = 'JGLoPfwRFqCwn4xZ8wUmSwp7'

const fixture = {
  name: 'text',
  lastModified: 'today',
  thumbnailUrl: 'kitten.png',
  document: {
    children: []
  },
  styles: {
    'hi': {
      name: 'blue',
      styleType: 'FILL'
    }
  }
}

const filepath = path.resolve('theme.json')
const remove = () => {
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath)
  }
}

test.before(remove)
test.after(remove)

test('returns a theme object', t => {
  const theme = parse(fixture)
  t.is(typeof theme, 'object')
  t.snapshot(theme)
})

test('throws with invalid api schema', t => {
  t.throws(() => {
    parse({ nope: 'nope' })
  })
})

test('cli generates JSON file', async t => {
  const child = spawn('./cli.js', [ testID ])
  await new Promise((resolve, reject) => {
    child.on('error', reject)
    child.on('close', resolve)
  })
  let theme
  t.notThrows(() => {
    theme = require('./theme.json')
    parse.schemas.Theme(theme)
  })
  t.is(typeof theme, 'object')
})
