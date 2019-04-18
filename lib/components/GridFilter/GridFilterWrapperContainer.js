"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _index = require("../../actions/index");

var _GridFilterWrapperComponent = _interopRequireDefault(require("./GridFilterWrapperComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mapDispatchForWrapper = function mapDispatchForWrapper(dispatch, _ref) {
  var grid = _ref.grid,
      initialValues = _ref.initialValues;
  return {
    initializeFilter: function initializeFilter() {
      return dispatch((0, _index.initializeFilter)(grid, initialValues));
    }
  };
};

var GridFilterWrapperContainer = (0, _reactRedux.connect)(null, mapDispatchForWrapper)(_GridFilterWrapperComponent["default"]);
GridFilterWrapperContainer.propTypes = {
  grid: _propTypes["default"].string.isRequired,
  initialValues: _propTypes["default"].object
};
var _default = GridFilterWrapperContainer;
exports["default"] = _default;