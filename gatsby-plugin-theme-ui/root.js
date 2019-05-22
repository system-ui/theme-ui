"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.wrapRootElement = void 0;

var _react = _interopRequireDefault(require("react"));

var _themeUi = require("theme-ui");

var _jsxFileName = "/Users/jxnblk/repos/theme-ui/gatsby-plugin-theme-ui/src/root.js";
var theme = {};

try {
  theme = require(THEME_UI_PATH);
  console.log(theme);
} catch (e) {
  console.error(e);
}

var wrapRootElement = function wrapRootElement(_ref) {
  var element = _ref.element,
      props = _ref.props;
  return _react.default.createElement(_themeUi.ThemeProvider, {
    theme: theme,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, element);
};

exports.wrapRootElement = wrapRootElement;