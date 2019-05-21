"use strict";

var fs = require('fs');

var path = require('path');
/*
exports.onPreBootstrap = ({ store }, opts) => {
  const { program } = store.getState()
  let module
  if (opts.theme) {
    const filepath = opts.theme
    const dirname = path.join(__dirname, '.cache')
    module = `module.exports = require('${filepath}')`

    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname)
    }

    fs.writeFileSync(path.join(dirname, 'theme.js'), module)
  }
}
*/


var instances = [];

exports.onPreInit = function (_ref, opts) {
  var store = _ref.store;
  if (!opts.theme) return;
  console.log(opts);

  var _store$getState = store.getState(),
      program = _store$getState.program;

  console.log(program.directory);
  var filepath = path.isAbsolute(opts.theme) ? opts.theme : path.join(program.directory, opts.theme); // only run once

  if (instances.includes(filepath)) return;
  if (instances.length) return;
  instances.push(filepath);
};

exports.onCreateWebpackConfig = function (_ref2) {
  var actions = _ref2.actions,
      plugins = _ref2.plugins;
  console.log('create webpack config', instances);
  actions.setWebpackConfig({
    plugins: [plugins.define({
      // THEME_UI_PATHS
      BEEP: JSON.stringify('boop'),
      THEME_UI_PATH: JSON.stringify(instances[0]),
      GATSBY_THEME_UI_PATHS: JSON.stringify(instances)
    })]
  });
};