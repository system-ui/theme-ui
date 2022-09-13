// @ts-check
import { exec } from 'egzek'
import { readFile, writeFile } from 'fs/promises'
import packageJson from '../package.json' assert { type: 'json' }

const DRY_RUN = false

const { version } = packageJson

const branch = exec('git branch --show-current', { stdio: 'pipe' })[0].trim()

const tag =
  branch === 'stable' ? 'latest' : branch === 'develop' ? 'develop' : 'canary'

const dryRun = DRY_RUN ? '--dry-run' : ''

await setVersions()
commitAndPush()
publishToNPM()

async function setVersions() {
  // All packages are locked on the same version.
  await Promise.all(
    getPackageJsonPaths().map(async (path) => {
      let text = await readFile(path, { encoding: 'utf-8' })
      text = text.replace(/"version": "\S+"/, `"version": "${version}"`)
      await writeFile(path, text, { encoding: 'utf-8' })
    })
  )
}

function commitAndPush() {
  exec(`
    git config user.name 'Piotr Monwid-Olechnowicz'
    git config user.email 'hasparus@gmail.com'
    git commit -am "Bump version to: v${version} [skip ci]"
    git push
  `)
}

function getPackageJsonPaths() {
  return exec(`find ./packages -type f -name "package.json"`, {
    stdio: 'pipe',
  })[0]
    .split('\n')
    .filter(Boolean)
}

function publishToNPM() {
  exec(`pnpm -r publish --no-git-checks --tag ${tag} ${dryRun}`, {
    stdio: 'inherit',
  })
}
