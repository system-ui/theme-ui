module.exports = {
  linters: {
    '*.{js,json}': ['prettier --write', 'git add'],
  },
  ignore: ['**/dist/*.min.js'],
}
