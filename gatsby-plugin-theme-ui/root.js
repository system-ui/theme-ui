"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.wrapRootElement = void 0;

var _react = _interopRequireDefault(require("react"));

var _themeUi = require("theme-ui");

var _lodash = _interopRequireDefault(require("lodash.merge"));

var _themeLoader = require("./theme-loader.js");

var _jsxFileName = "/Users/jxnblk/repos/theme-ui/gatsby-plugin-theme-ui/src/root.js";

var theme = _lodash.default.apply(void 0, [{}].concat(_themeLoader.themes));

var wrapRootElement = function wrapRootElement(_ref) {
  var element = _ref.element,
      props = _ref.props;
  return _react.default.createElement(_themeUi.ThemeProvider, {
    theme: theme,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, element);
};

exports.wrapRootElement = wrapRootElement;