"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _index = require("../../actions/index");

var _index2 = _interopRequireDefault(require("../Filter/index"));

var _GridFilterForm = _interopRequireDefault(require("./GridFilterForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var mapStateToProps = function mapStateToProps(_ref, _ref2) {
  var grid = _ref.grid;
  var gridname = _ref2.grid,
      initialValues = _ref2.initialValues,
      children = _ref2.children;
  return {
    form: gridname + 'Filter',
    initialValues: Object.assign({}, initialValues || {}, grid[gridname] && grid[gridname].filter),
    children: _react["default"].Children.map(children, function (child) {
      return _react["default"].isValidElement(child) && _typeof(child.type) === 'object' ? _react["default"].cloneElement(child, {
        grid: gridname
      }) : child;
    })
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref3) {
  var grid = _ref3.grid,
      initialValues = _ref3.initialValues;
  return {
    onSubmit: function onSubmit(data) {
      return dispatch((0, _index.applyFilter)(data, grid));
    },
    clearFilter: function clearFilter() {
      return dispatch((0, _index.applyFilter)(initialValues || {}, grid));
    }
  };
};

var GridFilterContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_GridFilterForm["default"]);
GridFilterContainer.propTypes = {
  grid: _propTypes["default"].string.isRequired,
  initialValues: _propTypes["default"].object,
  children: _propTypes["default"].node
};
var _default = GridFilterContainer;
exports["default"] = _default;