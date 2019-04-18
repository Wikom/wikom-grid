"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Filter = _interopRequireDefault(require("../Filter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DetailFilterComponent = function DetailFilterComponent(_ref) {
  var grid = _ref.grid,
      name = _ref.name,
      className = _ref.className,
      children = _ref.children,
      withDetailFilter = _ref.withDetailFilter;
  return withDetailFilter && _react["default"].createElement(_Filter["default"], {
    name: name,
    className: className,
    grid: grid
  }, children);
};

DetailFilterComponent.defaultProps = {
  className: 'col-sm-6 col-md-4 col-lg-3 form-group filter-element',
  withDetailFilter: false
};
DetailFilterComponent.propTypes = {
  name: _propTypes["default"].string.isRequired,
  children: _propTypes["default"].node,
  className: _propTypes["default"].string,
  grid: _propTypes["default"].string.isRequired,
  withDetailFilter: _propTypes["default"].bool.isRequired
};
var _default = DetailFilterComponent;
exports["default"] = _default;