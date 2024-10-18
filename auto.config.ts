import { AutoRc } from '@auto-it/core'
import { INpmConfig } from '@auto-it/npm'
import { ConventionalCommitsOptions } from '@auto-it/conventional-commits'
import { IAllContributorsPluginOptions } from '@auto-it/all-contributors'
import { IOmitCommitsPluginOptions } from '@auto-it/omit-commits'

const npmOptions: INpmConfig = {
  exact: true,
  commitNextVersion: true,
}

const conventionalCommitsOptions: ConventionalCommitsOptions = {
  defaultReleaseType: 'none',
}

const _allContributorsOptions: IAllContributorsPluginOptions = {
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

const omitCommitsOptions: IOmitCommitsPluginOptions = {
  subject: [
    'Merge branch',
    `Merge remote-tracking branch 'origin/stable' into develop`,
    'chore:',
    'chore(',
    'ci(',
    'ci:',
    'test:',
    'test(',
    'fix(ci):',
  ],
}

export default function config(): AutoRc {
  return {
    baseBranch: 'stable',
    prereleaseBranches: ['develop'],
    plugins: [
      ['npm', npmOptions],
      ['conventional-commits', conventionalCommitsOptions],
      'first-time-contributor',
      'released',
      // ['all-contributors', allContributorsOptions],
      ['omit-commits', omitCommitsOptions],
      // 'magic-zero',
    ],
    labels: [
      {
        name: 'pushToBaseBranch',
        changelogTitle: '👨‍💻 Minor changes', // 😈
      },
    ],
  }
}
