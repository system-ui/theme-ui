module.exports = {
  linters: {
    '*.{md,mdx,js,json}': ['prettier --write', 'git add'],
  },
  ignore: ['**/dist/*.min.js'],
}
