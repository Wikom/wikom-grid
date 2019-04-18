"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.mapState = void 0;

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _queryString = _interopRequireDefault(require("query-string"));

var _DetailFilterComponent = _interopRequireDefault(require("./DetailFilterComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mapState = function mapState(_ref) {
  var search = _ref.routing.location.search;
  return {
    withDetailFilter: _queryString["default"].parse(search).withDetailFilter === '1'
  };
};

exports.mapState = mapState;
var DetailFilterContainer = (0, _reactRedux.connect)(mapState)(_DetailFilterComponent["default"]);
DetailFilterContainer.defaultProps = {
  className: 'col-sm-6 col-md-4 col-lg-3 form-group filter-element'
};
DetailFilterContainer.propTypes = {
  name: _propTypes["default"].string.isRequired,
  children: _propTypes["default"].node,
  className: _propTypes["default"].string,
  grid: _propTypes["default"].string
};
var _default = DetailFilterContainer;
exports["default"] = _default;