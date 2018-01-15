'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mapDispatch = exports.toggleDetailFilter = exports.mapState = undefined;

var _reactRouterRedux = require('react-router-redux');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapState = exports.mapState = function mapState(_ref) {
    var search = _ref.routing.location.search;
    return {
        withDetailFilter: _queryString2.default.parse(search).withDetailFilter === '1'
    };
};

var toggleDetailFilter = exports.toggleDetailFilter = function toggleDetailFilter(withDetailFilter) {
    return function (dispatch, getState) {
        var location = getState().routing.location;
        var url = location.pathname;
        var queryParams = _queryString2.default.parse(location.search);

        queryParams.withDetailFilter = withDetailFilter;

        return dispatch((0, _reactRouterRedux.replace)({ pathname: url, search: _queryString2.default.stringify(queryParams) }));
    };
};

var mapDispatch = exports.mapDispatch = function mapDispatch(dispatch) {
    return {
        showDetailFilter: function showDetailFilter() {
            return dispatch(toggleDetailFilter('1'));
        },
        hideDetailFilter: function hideDetailFilter() {
            return dispatch(toggleDetailFilter('0'));
        }
    };
};