"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDispatch = exports.toggleDetailFilter = exports.mapState = void 0;

var _reactRouterRedux = require("react-router-redux");

var _queryString = _interopRequireDefault(require("query-string"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mapState = function mapState(_ref) {
  var search = _ref.routing.location.search;
  return {
    withDetailFilter: _queryString["default"].parse(search).withDetailFilter === '1'
  };
};

exports.mapState = mapState;

var toggleDetailFilter = function toggleDetailFilter(withDetailFilter) {
  return function (dispatch, getState) {
    var location = getState().routing.location;
    var url = location.pathname;

    var queryParams = _queryString["default"].parse(location.search);

    queryParams.withDetailFilter = withDetailFilter;
    return dispatch((0, _reactRouterRedux.replace)({
      pathname: url,
      search: _queryString["default"].stringify(queryParams)
    }));
  };
};

exports.toggleDetailFilter = toggleDetailFilter;

var mapDispatch = function mapDispatch(dispatch) {
  return {
    showDetailFilter: function showDetailFilter() {
      return dispatch(toggleDetailFilter('1'));
    },
    hideDetailFilter: function hideDetailFilter() {
      return dispatch(toggleDetailFilter('0'));
    }
  };
};

exports.mapDispatch = mapDispatch;