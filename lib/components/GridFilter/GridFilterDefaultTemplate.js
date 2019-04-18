"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactSymbol = _interopRequireDefault(require("react-symbol"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GridFilterDefaultTemplate = function GridFilterDefaultTemplate(_ref) {
  var clearFilter = _ref.clearFilter,
      children = _ref.children;
  return _react["default"].createElement("div", {
    className: "box box-default box-solid grid-search"
  }, _react["default"].createElement("div", {
    className: "box-header with-border"
  }, _react["default"].createElement("h3", {
    className: "box-title"
  }, "Filter"), _react["default"].createElement("div", {
    className: "box-tools pull-right"
  }, _react["default"].createElement("button", {
    type: "button",
    onClick: clearFilter,
    className: "btn btn-xs btn-default btn-filterReset"
  }, _react["default"].createElement(_reactSymbol["default"], {
    symbol: "undo"
  }), " Filter zur\xFCcksetzen"))), _react["default"].createElement("div", {
    className: "box-body"
  }, _react["default"].createElement("div", {
    id: "filter_row",
    className: "row"
  }, children), _react["default"].createElement("div", {
    id: "filter_apply_row",
    className: "filterapply-wrapper"
  }, _react["default"].createElement("button", {
    type: "submit",
    className: "btn btn-sm btn-primary"
  }, _react["default"].createElement(_reactSymbol["default"], {
    symbol: "filter"
  }), "Filter anwenden"))));
};

var _default = GridFilterDefaultTemplate;
exports["default"] = _default;