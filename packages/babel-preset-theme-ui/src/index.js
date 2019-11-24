module.exports = () => ({
  plugins: [
    [
      '@wordpress/babel-plugin-import-jsx-pragma',
      {
        source: 'theme-ui',
        scopeVariable: 'jsx',
        isDefault: false,
      },
    ],
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'jsx',
      },
    ],
  ],
})