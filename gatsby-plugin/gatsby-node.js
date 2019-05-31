"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.onCreateWebpackConfig = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _package = _interopRequireDefault(require("./package.json"));

// const fs = require('fs')
// const path = require('path')
// const pkg = require('./package.json')
var themeModules = [];

var onCreateWebpackConfig = function onCreateWebpackConfig(_ref, opts) {
  var actions = _ref.actions,
      loaders = _ref.loaders,
      store = _ref.store;

  var _store$getState = store.getState(),
      program = _store$getState.program,
      config = _store$getState.config,
      themes = _store$getState.themes;

  var siteThemeFilename = _path.default.join(program.directory, 'src', 'theme.js');

  if (Array.isArray(themes.themes)) {
    themes.themes.forEach(function (theme) {
      var hasThemePlugin = false;

      if (theme.themeConfig && theme.themeConfig.plugins) {
        hasThemePlugin = theme.themeConfig.plugins.includes(_package.default.name);
      }

      if (hasThemePlugin) {
        var filepath = _path.default.join(theme.themeDir, 'src', 'theme.js');

        if (_fs.default.existsSync(filepath)) {
          themeModules.push(filepath);
        }
      }
    });
  }

  if (_fs.default.existsSync(siteThemeFilename)) {
    themeModules.push(siteThemeFilename);
  }

  console.log('create webpack config', themeModules);
  actions.setWebpackConfig({
    module: {
      rules: [{
        test: /\.js$/,
        include: _path.default.dirname(require.resolve('gatsby-plugin-theme-ui'))
      }, {
        test: /gatsby-plugin-theme-ui\/loader/,
        use: [loaders.js(), {
          loader: require.resolve('./loader'),
          options: (0, _extends2.default)({}, opts, {
            config: config,
            themes: themeModules
          })
        }]
      }]
    }
  });
};

exports.onCreateWebpackConfig = onCreateWebpackConfig;