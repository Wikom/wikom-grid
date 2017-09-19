'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _Columns = require('./Columns');

var _Columns2 = _interopRequireDefault(_Columns);

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _FullRow = require('./FullRow');

var _FullRow2 = _interopRequireDefault(_FullRow);

var _reactLoading = require('react-loading');

var _reactLoading2 = _interopRequireDefault(_reactLoading);

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _actions = require('../actions');

var _pagination = require('./propTypes/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by rouven on 23.02.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Grid = function (_React$Component) {
    _inherits(Grid, _React$Component);

    function Grid(props) {
        _classCallCheck(this, Grid);

        var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, props));

        console.log('grid props', props);
        // console.log('---grid constructor---');
        _this._columns = _this.createColumns(props.children);
        _this._rows = _this.buildRows(props);
        return _this;
    }

    _createClass(Grid, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.initializeGrid(this.props.grid);
            this.props.changeData(this.props.grid, this.props.data);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // console.log('---grid will receive props---');
            // console.log(this.props);
            // console.log(nextProps);
            if (this.props.grid !== nextProps.grid) {
                this.props.destroyGrid(this.props.grid);
                this.props.initializeGrid(nextProps.grid);
                this._columns = this.createColumns(nextProps.children);
            }

            if (JSON.stringify(this.props.isLoading) !== JSON.stringify(nextProps.isLoading) || JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
                this.props.changeData(nextProps.grid, nextProps.data);
                // if (this.props.isLoading !== nextProps.isLoading) {
                // console.log('---isLoading changed---');
                this._rows = this.buildRows(nextProps);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.destroyGrid(this.props.grid);
        }
    }, {
        key: 'createColumns',
        value: function createColumns(children) {
            var columns = [];

            _react2.default.Children.forEach(children, function (child) {
                if (_react2.default.isValidElement(child) && child.type === _Columns2.default) {
                    _react2.default.Children.forEach(child.props.children, function (col) {
                        if (_react2.default.isValidElement(col)) {
                            columns.push(col);
                        }
                    });
                }
            });

            return columns;
        }
    }, {
        key: 'buildRows',
        value: function buildRows(_ref) {
            var _this2 = this;

            var grid = _ref.grid,
                isLoading = _ref.isLoading,
                data = _ref.data,
                rest = _objectWithoutProperties(_ref, ['grid', 'isLoading', 'data']);

            console.log('buildRows', grid, data, rest);
            return isLoading ? _react2.default.createElement(
                _FullRow2.default,
                { colSpan: this._columns.length },
                _react2.default.createElement(_reactLoading2.default, null)
            ) : data && data.length > 0 ? data.map(function (rowData, i) {
                return _react2.default.createElement(
                    _Row2.default,
                    { rowData: rowData, key: i, grid: grid },
                    _this2._columns
                );
            }) : _react2.default.createElement(
                _FullRow2.default,
                { colSpan: this._columns.length },
                'Keine Ergebnisse vorhanden'
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                grid = _props.grid,
                pagination = _props.pagination,
                handleSort = _props.handleSort,
                activeSort = _props.activeSort,
                actions = _props.actions,
                pageSizes = _props.pageSizes,
                paginationAfterGrid = _props.paginationAfterGrid,
                paginationCountFormat = _props.paginationCountFormat;

            var hasPagination = pagination && grid;
            var header = _react2.default.createElement(_Header2.default, {
                grid: grid,
                columns: this._columns,
                handleSort: handleSort,
                activeSort: activeSort
            });
            var className = this.props.className || "table table-striped table-hover table-bordered table-condensed";

            return _react2.default.createElement(
                'div',
                { className: 'grid-view' },
                _react2.default.createElement(
                    'div',
                    { className: 'box' },
                    _react2.default.createElement(
                        'div',
                        { className: 'box-body' },
                        actions,
                        hasPagination && paginationAfterGrid === false ? _react2.default.createElement(_Pagination2.default, _extends({ grid: grid, pageSizes: pageSizes, paginationCountFormat: paginationCountFormat }, pagination)) : null,
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'div',
                                { className: 'col-md-12' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'table-grid' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'table-responsive' },
                                        _react2.default.createElement(
                                            'table',
                                            {
                                                className: className },
                                            _react2.default.createElement(
                                                'thead',
                                                null,
                                                header
                                            ),
                                            _react2.default.createElement(
                                                'tbody',
                                                null,
                                                this._rows
                                            )
                                        )
                                    )
                                )
                            )
                        ),
                        hasPagination && paginationAfterGrid === true ? _react2.default.createElement(_Pagination2.default, _extends({ grid: grid, pageSizes: pageSizes, paginationCountFormat: paginationCountFormat }, pagination)) : null
                    )
                )
            );
        }
    }]);

    return Grid;
}(_react2.default.Component);

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
};

var GridContainer = (0, _reactRedux.connect)(null, mapDispatchToProps)(Grid);

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