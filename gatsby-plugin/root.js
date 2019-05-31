"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.wrapRootElement = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _themeUi = require("theme-ui");

var _lodash = _interopRequireDefault(require("lodash.merge"));

var _loader = require("gatsby-plugin-theme-ui/loader");

var theme = _lodash.default.apply(void 0, [{}].concat(_loader.themes));

console.log(_loader.themes);

var wrapRootElement = function wrapRootElement(_ref, opts) {
  var element = _ref.element;
  console.log('ThemeProvider', theme);
  return (0, _themeUi.jsx)(_themeUi.ThemeProvider, (0, _extends2.default)({}, opts, {
    theme: theme
  }), theme.initialColorMode && (0, _themeUi.jsx)(_themeUi.ColorMode, {
    key: 'theme-ui-color-mode'
  }), element);
};

exports.wrapRootElement = wrapRootElement;