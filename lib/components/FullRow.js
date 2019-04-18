"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by rouven on 02.03.17.
 */
var FullRow = function FullRow(_ref) {
  var colSpan = _ref.colSpan,
      children = _ref.children;
  return _react["default"].createElement("tr", {
    key: "1"
  }, _react["default"].createElement("td", {
    colSpan: colSpan,
    className: "text-center"
  }, children));
};

FullRow.propTypes = {
  colSpan: _propTypes["default"].number.isRequired,
  children: _propTypes["default"].node
};
var _default = FullRow;
exports["default"] = _default;