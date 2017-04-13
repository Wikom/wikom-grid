'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _wikomData = require('wikom-data');

var _wikomData2 = _interopRequireDefault(_wikomData);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by rouven on 22.03.17.
                                                                                                                                                                                                                              */

var ConnectedGrid = function ConnectedGrid(_ref) {
    var grid = _ref.grid,
        url = _ref.url,
        force = _ref.force,
        children = _ref.children,
        rest = _objectWithoutProperties(_ref, ['grid', 'url', 'force', 'children']);

    return _react2.default.createElement(
        _wikomData2.default,
        _extends({ name: grid, grid: grid, url: url, force: force }, rest),
        children
    );
};

var mapStateToProps = function mapStateToProps(state, _ref2) {
    var grid = _ref2.grid,
        baseUrl = _ref2.baseUrl;

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
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref3) {
    var grid = _ref3.grid;
    return {
        handleSort: function handleSort(idx, asc) {
            return dispatch((0, _actions.changeSort)(grid, idx, asc));
        }
    };
};

var ConnectedGridContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ConnectedGrid);

ConnectedGridContainer.defaultProps = {
    force: true
};

ConnectedGridContainer.propTypes = {
    grid: _propTypes2.default.string.isRequired,
    baseUrl: _propTypes2.default.string.isRequired,
    force: _propTypes2.default.bool
};

exports.default = ConnectedGridContainer;