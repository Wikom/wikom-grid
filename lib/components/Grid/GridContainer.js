'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _GridComponent = require('./GridComponent');

var _GridComponent2 = _interopRequireDefault(_GridComponent);

var _index = require('../../actions/index');

var _Pagination = require('../Pagination');

var _pagination = require('../propTypes/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapState = function mapState(_ref, _ref2) {
    var gridState = _ref.grid;
    var grid = _ref2.grid;
    return {
        selection: gridState[grid] && gridState[grid].selection || []
    };
}; /**
    * Created by marvin.ruppelt on 24.09.17.
    */

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

var Grid = (0, _reactRedux.connect)(mapState, mapDispatchToProps)(_GridComponent2.default);

Grid.defaultProps = {
    pageSizes: [10, 20, 50],
    paginationAfterGrid: false,
    paginationCountFormat: _Pagination.PAGINATION_COUNT_FORMAT_SHORT
};

Grid.propTypes = {
    children: _propTypes2.default.node,
    data: _propTypes2.default.arrayOf(_propTypes2.default.object),
    isLoading: _propTypes2.default.bool.isRequired,
    pagination: _propTypes2.default.shape(_pagination2.default),
    grid: _propTypes2.default.string.isRequired,
    pageSizes: _propTypes2.default.arrayOf(_propTypes2.default.number),
    paginationAfterGrid: _propTypes2.default.bool,
    paginationCountFormat: _propTypes2.default.func
};

exports.default = Grid;