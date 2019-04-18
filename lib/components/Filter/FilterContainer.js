"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _FilterComponent = _interopRequireDefault(require("./FilterComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mapState = function mapState(_ref, _ref2) {
  var grid = _ref.grid;
  var gridname = _ref2.grid,
      name = _ref2.name,
      className = _ref2.className;
  return {
    className: grid[gridname] && grid[gridname].filter.hasOwnProperty(name) && grid[gridname].filter[name] !== null && grid[gridname].filter[name] !== "" && className + ' filter_active' || className
  };
};

var FilterContainer = (0, _reactRedux.connect)(mapState)(_FilterComponent["default"]);
FilterContainer.defaultProps = {
  className: 'col-sm-6 col-md-4 col-lg-3 form-group filter-element'
};
FilterContainer.propTypes = {
  name: _propTypes["default"].string.isRequired,
  children: _propTypes["default"].node,
  className: _propTypes["default"].string,
  grid: _propTypes["default"].string
};
var _default = FilterContainer;
exports["default"] = _default;