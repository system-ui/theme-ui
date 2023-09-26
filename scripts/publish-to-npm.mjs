// @ts-check
import { exec } from 'egzek'
import { readFile, writeFile } from 'fs/promises'
import semver from 'semver'
import packageJson from '../package.json' assert { type: 'json' }

{
  const DRY_RUN = false
  const PRODUCTION_BRANCH = 'stable'
  const PRERELEASE_BRANCH = 'develop'
  const PRERELEASE_NPM_TAG = 'develop'
  const CANARY_NPM_TAG = 'canary'

  const version = getVersion(packageJson)
  const branch =
    exec('git branch --show-current', { stdio: 'pipe' })[0].trim() ||
    process.env.BRANCH_NAME
  console.log('Current branch:', branch)

  await setVersions({ version })

  if (checkStatus() === 'clear') process.exit(0)

  commitAndPush({ version })
  publishToNPM({
    tag:
      branch === PRODUCTION_BRANCH
        ? 'latest'
        : branch === PRERELEASE_BRANCH
        ? PRERELEASE_NPM_TAG
        : CANARY_NPM_TAG,
    dryRun: DRY_RUN ? '--dry-run' : '',
  })
}

/**
 * @param {{ version: string }} params
 */
async function setVersions({ version }) {
  // All packages are locked on the same version.
  const packageJsonPaths = getPackageJsonPaths()
  console.log(`Found ${packageJsonPaths.length} package.json files.`)
  await Promise.all(
    packageJsonPaths.map(async (path) => {
      let text = await readFile(path, { encoding: 'utf-8' })
      text = text.replace(/"version": "\S+"/, `"version": "${version}"`)
      await writeFile(path, text, { encoding: 'utf-8' })
    })
  )
  console.log(`Updated all package.json files to version ${version}.`)
}

function checkStatus() {
  const status = exec('git status', { stdio: 'pipe' })[0].trim()
  if (status.includes('nothing to commit, working tree clean')) {
    console.log('No changes to commit. Skipping release.')
    return 'clear'
  } else {
    console.log(status)
    return 'dirty'
  }
}

/**
 * @param {{ version: string }} packageJson
 */
function getVersion(packageJson) {
  const latestTagVersion = exec(`git describe --abbrev=0 --match "v*"`, {
    stdio: 'pipe',
  })[0]
    .trim()
    .slice(1) // remove leading "v"

  console.log('Latest tag version:', latestTagVersion)
  console.log('Root package.json version:', packageJson.version)
  const version = semver.gt(packageJson.version, latestTagVersion)
    ? packageJson.version
    : latestTagVersion

  return version
}

/**
 * @param {{ version: string }} params
 */
function commitAndPush({ version }) {
  exec(`
    git config user.name 'Piotr Monwid-Olechnowicz'
    git config user.email 'hasparus@gmail.com'
    git commit -am "Bump versions to: ${version} [skip ci]"
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

/**
 * @param {{ tag: string, dryRun: string }} params
 */
function publishToNPM({ tag, dryRun }) {
  exec(`pnpm -r publish --no-git-checks --tag ${tag} ${dryRun}`, {
    stdio: 'inherit',
  })
}
