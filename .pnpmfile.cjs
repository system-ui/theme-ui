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
          found[x].push(p)
        } else {
          found[x] = [p]
        }
      }
    }
  }

  let msg = ''

  for (let p in found) {
    const count = found[p].length
    if (count > 1) {
      msg +=
        `${p} found ${count} times\n` +
        found[p].map((s) => `- ${s}`).join('\n') +
        '\n\n'
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
