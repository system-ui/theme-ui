const PACKAGES_WITH_ENFORCED_SINGLE_VERSION = ['@emotion/react']

/**
 * @author remorses
 * @see https://github.com/pnpm/pnpm/issues/2713#issuecomment-1141000426
 */
function afterAllResolved(lockfile, context) {
  context.log('Checking duplicate packages...')

  const packagesKeys = Object.keys(lockfile.packages)
  const found = {}
  for (let p of packagesKeys) {
    for (let x of PACKAGES_WITH_ENFORCED_SINGLE_VERSION) {
      if (p.startsWith(`/${x}/`)) {
        if (found[x]) {
          found[x] += 1
        } else {
          found[x] = 1
        }
      }
    }
  }

  let msg = ''

  for (let p in found) {
    const count = found[p]
    if (count > 1) {
      msg += `${p} found ${count} times\n`
    }
  }

  if (msg) console.warn('\n\n\n🔥\n', '🔥', msg, '\n🔥\n\n\n')

  return lockfile
}

module.exports = {
  hooks: {
    afterAllResolved,
  },
}
