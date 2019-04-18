"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _GridComponent = _interopRequireDefault(require("./GridComponent"));

var _index = require("../../actions/index");

var _Pagination = require("../Pagination");

var _pagination = _interopRequireDefault(require("../propTypes/pagination"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by marvin.ruppelt on 24.09.17.
 */
var mapState = function mapState(_ref, _ref2) {
  var gridState = _ref.grid;
  var grid = _ref2.grid;
  return {
    selection: gridState[grid] && gridState[grid].selection || []
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    initializeGrid: function initializeGrid(grid) {
      return dispatch((0, _index.initializeGrid)(grid));
    },
    destroyGrid: function destroyGrid(grid) {
      return dispatch((0, _index.destroyGrid)(grid));
    },
    changeData: function changeData(grid, data) {
      return dispatch((0, _index.changeData)(grid, data));
    }
  };
};

var Grid = (0, _reactRedux.connect)(mapState, mapDispatchToProps)(_GridComponent["default"]);
Grid.defaultProps = {
  pageSizes: [10, 20, 50],
  paginationAfterGrid: false,
  paginationCountFormat: _Pagination.PAGINATION_COUNT_FORMAT_SHORT
};
Grid.propTypes = {
  children: _propTypes["default"].node,
  data: _propTypes["default"].arrayOf(_propTypes["default"].object),
  isLoading: _propTypes["default"].bool.isRequired,
  pagination: _propTypes["default"].shape(_pagination["default"]),
  grid: _propTypes["default"].string.isRequired,
  pageSizes: _propTypes["default"].arrayOf(_propTypes["default"].number),
  paginationAfterGrid: _propTypes["default"].bool,
  paginationCountFormat: _propTypes["default"].func
};
var _default = Grid;
exports["default"] = _default;