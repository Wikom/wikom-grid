"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _queryString = _interopRequireDefault(require("query-string"));

var _index = require("../../actions/index");

var _ConnectedGridComponent = _interopRequireDefault(require("./ConnectedGridComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by rouven on 22.03.17.
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var grid = _ref.grid,
      baseUrl = _ref.baseUrl;
  var url = baseUrl;
  var activeSort = null;

  if (state.grid[grid]) {
    var append = {};

    if (state.grid[grid].filter) {
      for (var filter in state.grid[grid].filter) {
        append['filter[' + filter + ']'] = state.grid[grid].filter[filter];
      }
    }

    var pagination = state.grid[grid].pagination;

    if (pagination && pagination.pageSize) {
      append['per-page'] = pagination.pageSize;
    }

    if (pagination && pagination.currentPage) {
      append['page'] = pagination.currentPage;
    }

    if (state.grid[grid].sort) {
      activeSort = state.grid[grid].sort;
      append['sort'] = state.grid[grid].sort;
    }

    if (Object.keys(append).length > 0) {
      var seperator = url.indexOf('?') !== -1 ? '&' : '?';
      url += seperator + _queryString["default"].stringify(append);
    }
  }

  return {
    url: url,
    activeSort: activeSort
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var grid = _ref2.grid;
  return {
    handleSort: function handleSort(idx, asc) {
      return dispatch((0, _index.changeSort)(grid, idx, asc));
    }
  };
};

var ConnectedGrid = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_ConnectedGridComponent["default"]);
ConnectedGrid.defaultProps = {
  force: true
};
ConnectedGrid.propTypes = {
  grid: _propTypes["default"].string.isRequired,
  baseUrl: _propTypes["default"].string.isRequired,
  force: _propTypes["default"].bool
};
var _default = ConnectedGrid;
exports["default"] = _default;