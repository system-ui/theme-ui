import { AutoRc } from '@auto-it/core'
import { INpmConfig } from '@auto-it/npm'
import { IAllContributorsPluginOptions } from '@auto-it/all-contributors'

const npmOptions: INpmConfig = {
  exact: true,
}

const allContributorsOptions: IAllContributorsPluginOptions = {
  exclude: [
    'dependabot',
    'dependabot[bot]',
    '@dependabot[bot]',
    'dependabot-preview',
    'dependabot-preview[bot]',
    '@dependabot-preview[bot]',
  ],
  types: {
    infra: ['./github/**/*'],
    example: ['examples/**/*'],
    doc: ['**/*.mdx', '**/*.md', 'packages/docs/**/*'],
    test: ['**/*.test.*', '**/*.spec.*'],
    code: [
      'packages/**/*.js',
      'packages/**/*.ts',
      'packages/**/*.jsx',
      'packages/**/*.tsx',
      '**/package.json',
      '**/tsconfig.json',
    ],
  },
}

export default function config(): AutoRc {
  return {
    baseBranch: 'stable',
    prereleaseBranches: ['develop'],
    plugins: [
      ['npm', npmOptions],
      'conventional-commits',
      'first-time-contributor',
      'released',
      ['all-contributors', allContributorsOptions],
      // 'magic-zero',
    ],
  }
}
