"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactRedux = require("react-redux");

var _GridFilterDetailTemplateComponent = _interopRequireDefault(require("./GridFilterDetailTemplateComponent"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GridFilterDetailTemplateContainer = (0, _reactRedux.connect)(_helpers.mapState, _helpers.mapDispatch)(_GridFilterDetailTemplateComponent["default"]);
var _default = GridFilterDetailTemplateContainer;
exports["default"] = _default;