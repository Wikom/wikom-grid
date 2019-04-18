"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _EditableColumnComponent = _interopRequireDefault(require("./EditableColumnComponent"));

var _actions = require("../../../actions");

var _Column = _interopRequireDefault(require("../Column"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mapState = function mapState(_ref, _ref2) {
  var grid = _ref.grid;
  var gridname = _ref2.grid,
      rowId = _ref2.rowId,
      colId = _ref2.colId,
      rowData = _ref2.rowData,
      idx = _ref2.idx;
  return {
    rowInEdit: grid[gridname].edit && grid[gridname].edit.rowId === rowId || false,
    cellInEdit: grid[gridname].edit && grid[gridname].edit.rowId === rowId && grid[gridname].edit.colId === colId || false,
    submitStatus: grid[gridname].edit && grid[gridname].edit.status && grid[gridname].edit.status[rowId] && grid[gridname].edit.status[rowId][colId] || null,
    changedRowData: grid[gridname].edit && grid[gridname].edit.values && grid[gridname].edit.values[rowId] && grid[gridname].edit.values[rowId].hasOwnProperty(colId) && _objectSpread({}, rowData, _defineProperty({}, idx, grid[gridname].edit.values[rowId][colId])) || null,
    hasValueChanged: grid[gridname].edit && grid[gridname].edit.values && grid[gridname].edit.values[rowId] && grid[gridname].edit.values[rowId].hasOwnProperty(colId) || false
  };
};

var mapDispatch = function mapDispatch(dispatch, _ref3) {
  var grid = _ref3.grid,
      rowId = _ref3.rowId,
      colId = _ref3.colId;
  return {
    onClick: function onClick() {
      return dispatch((0, _actions.editStart)(grid, rowId, colId));
    },
    onBlur: function onBlur() {
      return dispatch((0, _actions.editEnd)(grid, rowId, colId));
    }
  };
};

var EditableColumnContainer = (0, _reactRedux.connect)(mapState, mapDispatch)(_EditableColumnComponent["default"]);
EditableColumnContainer.defaultProps = {
  formComponent: 'input',
  component: _Column["default"]
};
EditableColumnContainer.propTypes = {
  name: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]).isRequired,
  rowId: _propTypes["default"].number,
  colId: _propTypes["default"].number,
  rowData: _propTypes["default"].object,
  idx: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  component: _propTypes["default"].func,
  formComponent: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func])
};
var _default = EditableColumnContainer;
exports["default"] = _default;