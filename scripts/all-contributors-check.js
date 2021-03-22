#!/bin/env node
//@ts-check

const { exec } = require('egzek')

const bots = ['dependabot-preview[bot]', 'dependabot[bot]']

const [output] = exec('npx all-contributors check', { stdio: 'pipe' })

let [header, missingContributors] = output.split('\n')

missingContributors = missingContributors
  .split(', ')
  .map((x) => x.trim())
  .filter((name) => !bots.includes(name))
  .join(', ')

/**
 * @param s {string}
 */
const bold = (s) => `\u001b[1m${s}\u001b[0m`

console.log(bold(header) + '\n', missingContributors)
