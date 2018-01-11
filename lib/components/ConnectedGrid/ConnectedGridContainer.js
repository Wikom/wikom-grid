'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _index = require('../../actions/index');

var _ConnectedGridComponent = require('./ConnectedGridComponent');

var _ConnectedGridComponent2 = _interopRequireDefault(_ConnectedGridComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            url += '?' + _queryString2.default.stringify(append);
        }
    }

    return {
        url: url,
        activeSort: activeSort
    };
}; /**
    * Created by rouven on 22.03.17.
    */

var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
    var grid = _ref2.grid;
    return {
        handleSort: function handleSort(idx, asc) {
            return dispatch((0, _index.changeSort)(grid, idx, asc));
        }
    };
};

var ConnectedGrid = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_ConnectedGridComponent2.default);

ConnectedGrid.defaultProps = {
    force: true
};

ConnectedGrid.propTypes = {
    grid: _propTypes2.default.string.isRequired,
    baseUrl: _propTypes2.default.string.isRequired,
    force: _propTypes2.default.bool
};

exports.default = ConnectedGrid;