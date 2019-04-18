"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _CheckboxHeaderComponent = _interopRequireDefault(require("./CheckboxHeaderComponent"));

var _index = require("../../../actions/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mapStateToHeaderProps = function mapStateToHeaderProps(state, _ref) {
  var grid = _ref.grid,
      idx = _ref.idx;
  return {
    allValues: state.grid[grid] && state.grid[grid].data ? JSON.stringify(state.grid[grid].data.map(function (value) {
      return value[idx];
    })) : '',
    checked: (state.grid[grid] && state.grid[grid].data && state.grid[grid].data.length > 0 && state.grid[grid].data.length === state.grid[grid].selection.length) === true
  };
};

var mapDispatchToHeaderProps = function mapDispatchToHeaderProps(dispatch, _ref2) {
  var grid = _ref2.grid;
  return {
    onChange: function onChange(evt) {
      return dispatch((0, _index.changeSelection)(grid, evt.target));
    }
  };
};

var CheckboxHeaderContainer = (0, _reactRedux.connect)(mapStateToHeaderProps, mapDispatchToHeaderProps)(_CheckboxHeaderComponent["default"]);
var _default = CheckboxHeaderContainer;
exports["default"] = _default;