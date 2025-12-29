const path = require('path')

const withMDX = require('@next/mdx')()

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  webpack(config, { isServer }) {
    // Ensure single instances of React and theme-ui packages in the monorepo
    Object.assign(config.resolve.alias, {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'theme-ui': path.resolve(__dirname, '../../packages/theme-ui'),
      '@theme-ui/core': path.resolve(__dirname, '../../packages/core'),
      '@theme-ui/css': path.resolve(__dirname, '../../packages/css'),
      '@theme-ui/color-modes': path.resolve(__dirname, '../../packages/color-modes'),
      '@theme-ui/components': path.resolve(__dirname, '../../packages/components'),
      '@theme-ui/theme-provider': path.resolve(__dirname, '../../packages/theme-provider'),
      '@emotion/react': path.resolve(__dirname, './node_modules/@emotion/react'),
    })

    // Don't follow symlinks - use package.json exports to resolve to built files
    config.resolve.symlinks = false

    // Use CJS on server to avoid async ESM module interop issues with @emotion
    if (isServer) {
      config.resolve.conditionNames = ['require', 'node', 'default']
    }

    return config
  },
  typescript: {
    ignoreBuildErrors: true,
  },
})
