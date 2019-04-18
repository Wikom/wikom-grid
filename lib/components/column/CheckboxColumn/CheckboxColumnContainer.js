"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _CheckboxColumnComponent = _interopRequireDefault(require("./CheckboxColumnComponent"));

var _CheckboxHeaderContainer = _interopRequireDefault(require("./CheckboxHeaderContainer"));

var _findInObject = _interopRequireDefault(require("find-in-object"));

var _index = require("../../../actions/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mapStateToProps = function mapStateToProps(state, _ref) {
  var grid = _ref.grid,
      idx = _ref.idx,
      rowData = _ref.rowData;
  return {
    checked: state.grid[grid] && state.grid[grid].selection && state.grid[grid].selection.indexOf((0, _findInObject["default"])(idx, rowData)) !== -1
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var grid = _ref2.grid;
  return {
    onChange: function onChange(evt) {
      return dispatch((0, _index.changeSelection)(grid, evt.target));
    }
  };
};

var CheckboxColumnContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_CheckboxColumnComponent["default"]);
CheckboxColumnContainer.defaultProps = {
  idx: 'id',
  ThComponent: _CheckboxHeaderContainer["default"]
};
var _default = CheckboxColumnContainer;
exports["default"] = _default;