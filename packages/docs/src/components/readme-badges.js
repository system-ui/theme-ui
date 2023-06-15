// Straight-up copied from README.md
// We may extract it from that Markdown file in a fancy way some day. Maybe...
export default function ReadmeBadges() {
  return (
    <div
      data-testid="readme-badges"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        '> a': { height: '20px' },
      }}
    >
      <a href="https://github.com/system-ui/theme-ui">
        <img
          src="https://badgen.net/badge/-/github?icon=github&label"
          alt="GitHub"
        />
      </a>
      <a href="https://github.com/system-ui/theme-ui/stargazers">
        <img
          src="https://badgen.net/github/stars/system-ui/theme-ui"
          alt="GitHub Stars"
        />
      </a>
      <a>
        <img
          alt="npm (latest)"
          src="https://img.shields.io/npm/v/theme-ui/latest"
        />
      </a>
      <a>
        <img
          alt="npm (develop)"
          src="https://img.shields.io/npm/v/theme-ui/develop?color=%23e044aa"
        />
      </a>
      <a href="https://github.com/system-ui/theme-ui/graphs/contributors">
        <img
          src="https://img.shields.io/github/contributors/system-ui/theme-ui"
          alt="Contributors"
        />
      </a>
      <a href="https://badgen.net/bundlephobia/minzip/theme-ui">
        <img src="https://badgen.net/bundlephobia/minzip/theme-ui" alt="Size" />
      </a>
      <a href="https://bundlephobia.com/result?p=theme-ui">
        <img
          src="https://badgen.net/bundlephobia/tree-shaking/theme-ui"
          alt="Tree Shaking"
        />
      </a>
      <a href="https://github.com/system-ui/theme-ui/blob/stable/LICENSE.md">
        <img
          src="https://badgen.net/badge/license/MIT/blue"
          alt="MIT license"
        />
      </a>
      <a href="https://discord.gg/theme-ui">
        <img
          src="https://img.shields.io/discord/778553042466635786?color=%237289da&logo=discord"
          alt="Join our Discord community"
        />
      </a>
      <a href="https://dashboard.cypress.io/projects/fmfid1/runs">
        <img
          src="https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/fmfid1/stable&logo=cypress"
          alt="This project is using Cypress for end-to-end tests."
        />
      </a>
      <a href="https://percy.io/95212972/theme-ui">
        <img
          src="https://percy.io/static/images/percy-badge.svg"
          alt="This project is using Percy.io for visual regression testing."
        />
      </a>
    </div>
  )
}
