"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var BaseColumn = function BaseColumn(_ref) {
  var className = _ref.className,
      onClick = _ref.onClick,
      children = _ref.children,
      cellWidth = _ref.cellWidth;
  var tdProps = {
    onClick: onClick
  };

  switch (_typeof(className)) {
    case 'object':
      if (className.td) {
        tdProps.className = className.td;
      }

      break;

    case 'string':
      tdProps.className = className;
      break;
  }

  return _react["default"].createElement("td", tdProps, cellWidth ? _react["default"].createElement("div", {
    style: {
      'width': cellWidth
    }
  }, children) : children);
};

BaseColumn.propTypes = {
  className: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  children: _propTypes["default"].node,
  cellWidth: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])
};
var _default = BaseColumn;
exports["default"] = _default;