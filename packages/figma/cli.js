#!/usr/bin/env node
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const meow = require('meow')
const chalk = require('chalk')
const Figma = require('figma-js')
const parse = require('./lib')

const config = require('pkg-conf').sync('theme-ui-figma')

const log = (...args) => {
  console.log(
    chalk.cyan('[@theme-ui/figma]'),
    ...args
  )
}
log.error = (...args) => {
  console.log(
    chalk.red('[error]'),
    ...args
  )
}

const cli = meow(`
  ${chalk.gray('Usage')}

    $ theme-ui-figma <file-id>

  ${chalk.gray('Options')}

    -d --out-dir    Output directory (default cwd)
    --metadata      Include metadata from Figma API

`, {
  flags: {
    outDir: {
      type: 'string',
      alias: 'd'
    },
    metadata: {
      type: 'boolean'
    },
    debug: {
      type: 'boolean'
    }
  }
})

const token = process.env.FIGMA_TOKEN
const [ id ] = cli.input

const opts = Object.assign({
  outDir: ''
}, config, cli.flags)

if (!token) {
  log.error('FIGMA_TOKEN not found')
  process.exit(1)
}

if (!id) {
  cli.showHelp(0)
}

opts.outDir = path.resolve(opts.outDir)

if (!fs.existsSync(opts.outDir)) {
  fs.mkdirSync(opts.outDir)
}

const outFile = path.join(
  opts.outDir,
  'theme.json'
)

const figma = Figma.Client({
  personalAccessToken: token
})

log('fetching data for:', chalk.gray(id))

figma.file(id)
  .then(res => {
    if (res.status !== 200) {
      log.error(res.status, res.statusText)
      process.exit(1)
      return
    }
    const { data } = res

    log('parsing data...')

    const json = JSON.stringify(parse(data, opts), null, 2)

    fs.writeFile(outFile, json, (err) => {
      if (err) {
        log.error(err)
        process.exit(1)
      }
      log('file saved', chalk.gray(outFile))
    })

    if (opts.debug) {
      fs.writeFile(path.join(opts.outDir, 'data.json'), JSON.stringify(data, null, 2), err => {})
    }
  })
  .catch(err => {
    const { response } = err
    log.error(response.status, response.statusText)
    process.exit(1)
  })

require('update-notifier')({
  pkg: cli.pkg
}).notify()
