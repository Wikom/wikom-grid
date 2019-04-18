"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reduxForm = require("redux-form");

var _GridFilterComponent = _interopRequireDefault(require("./GridFilterComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GridFilterForm = (0, _reduxForm.reduxForm)({
  enableReinitialize: true
})(_GridFilterComponent["default"]);
var _default = GridFilterForm;
exports["default"] = _default;