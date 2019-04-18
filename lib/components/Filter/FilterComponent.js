"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FilterComponent = function FilterComponent(_ref) {
  var children = _ref.children,
      className = _ref.className;
  return _react["default"].createElement("div", {
    className: className
  }, children);
};

FilterComponent.defaultProps = {
  className: 'col-sm-6 col-md-4 col-lg-3 form-group filter-element'
};
FilterComponent.propTypes = {
  name: _propTypes["default"].string.isRequired,
  children: _propTypes["default"].node,
  className: _propTypes["default"].string
};
var _default = FilterComponent;
exports["default"] = _default;