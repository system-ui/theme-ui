"use strict";

exports.__esModule = true;
exports.onRenderBody = exports.wrapRootElement = void 0;

var _themeUi = require("theme-ui");

var _root = require("./root");

exports.wrapRootElement = _root.wrapRootElement;
// prevent color mode flash
var noflash = "\n(function() {\n  try {\n    var mode = localStorage.getItem('theme-ui-color-mode');\n    if (!mode) return\n    document.body.classList.add('theme-ui-' + mode);\n  } catch (e) {\n  }\n})();\n";

var onRenderBody = function onRenderBody(_ref) {
  var setPreBodyComponents = _ref.setPreBodyComponents;
  var script = (0, _themeUi.jsx)('script', {
    dangerouslySetInnerHTML: {
      __html: noflash
    }
  });
  setPreBodyComponents([script]);
};

exports.onRenderBody = onRenderBody;