'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _Grid = require('../components/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _actions = require('../actions');

var _Pagination = require('../components/Pagination');

var _pagination = require('../components/propTypes/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        initializeGrid: function initializeGrid(grid) {
            return dispatch((0, _actions.initializeGrid)(grid));
        },
        destroyGrid: function destroyGrid(grid) {
            return dispatch((0, _actions.destroyGrid)(grid));
        },
        changeData: function changeData(grid, data) {
            return dispatch((0, _actions.changeData)(grid, data));
        }
    };
}; /**
    * Created by marvin.ruppelt on 24.09.17.
    */

var GridContainer = (0, _reactRedux.connect)(null, mapDispatchToProps)(_Grid2.default);

GridContainer.defaultProps = {
    pageSizes: [10, 20, 50],
    paginationAfterGrid: false,
    paginationCountFormat: _Pagination.PAGINATION_COUNT_FORMAT_SHORT
};

GridContainer.propTypes = {
    children: _propTypes2.default.node,
    data: _propTypes2.default.arrayOf(_propTypes2.default.object),
    isLoading: _propTypes2.default.bool.isRequired,
    pagination: _propTypes2.default.shape(_pagination2.default),
    grid: _propTypes2.default.string.isRequired,
    pageSizes: _propTypes2.default.arrayOf(_propTypes2.default.number),
    paginationAfterGrid: _propTypes2.default.bool,
    paginationCountFormat: _propTypes2.default.func
};

exports.default = GridContainer;