"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactSymbol = _interopRequireDefault(require("react-symbol"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GridFilterDetailTemplate = function GridFilterDetailTemplate(_ref) {
  var clearFilter = _ref.clearFilter,
      withDetailFilter = _ref.withDetailFilter,
      showDetailFilter = _ref.showDetailFilter,
      hideDetailFilter = _ref.hideDetailFilter,
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
  }), " Filter zur\xFCcksetzen"), withDetailFilter ? _react["default"].createElement("button", {
    type: "button",
    onClick: hideDetailFilter,
    className: "btn btn-xs btn-default btn-filterDetailToggle"
  }, _react["default"].createElement(_reactSymbol["default"], {
    symbol: "minus-circle"
  }), " Detailfilter ausblenden") : _react["default"].createElement("button", {
    type: "button",
    onClick: showDetailFilter,
    className: "btn btn-xs btn-default btn-filterDetailToggle"
  }, _react["default"].createElement(_reactSymbol["default"], {
    symbol: "plus-circle"
  }), " Detailfilter anzeigen"))), _react["default"].createElement("div", {
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

var _default = GridFilterDetailTemplate;
exports["default"] = _default;