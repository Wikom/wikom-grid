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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by marvin.ruppelt on 21.09.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var GridTable = function (_React$Component) {
    _inherits(GridTable, _React$Component);

    function GridTable(props) {
        _classCallCheck(this, GridTable);

        var _this = _possibleConstructorReturn(this, (GridTable.__proto__ || Object.getPrototypeOf(GridTable)).call(this, props));

        _this._columns = _this.createColumns(props.children);
        _this._rows = _this.buildRows(props);
        return _this;
    }

    _createClass(GridTable, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.initializeGrid(this.props.grid);
            this.props.changeData(this.props.grid, this.props.data);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.grid !== nextProps.grid) {
                this.props.destroyGrid(this.props.grid);
                this.props.initializeGrid(nextProps.grid);
                this._columns = this.createColumns(nextProps.children);
            }

            if (JSON.stringify(this.props.isLoading) !== JSON.stringify(nextProps.isLoading) || JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
                this.props.changeData(nextProps.grid, nextProps.data);

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
                data = _ref.data;

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
                paginationCountFormat = _props.paginationCountFormat,
                boxHeader = _props.boxHeader;

            var hasPagination = pagination && grid;
            var header = _react2.default.createElement(_Header2.default, {
                grid: grid,
                columns: this._columns,
                handleSort: handleSort,
                activeSort: activeSort
            });
            var className = this.props.className || "table table-striped table-hover table-bordered table-condensed";
            var boxClassName = this.props.boxClassName || "box";

            return _react2.default.createElement(
                'div',
                { className: 'grid-view' },
                _react2.default.createElement(
                    'div',
                    { className: boxClassName },
                    boxHeader || null,
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

    return GridTable;
}(_react2.default.Component);

GridTable.propTypes = {
    children: _propTypes2.default.node,
    data: _propTypes2.default.arrayOf(_propTypes2.default.object),
    isLoading: _propTypes2.default.bool.isRequired,
    pagination: _propTypes2.default.shape(_pagination2.default),
    grid: _propTypes2.default.string.isRequired,
    pageSizes: _propTypes2.default.arrayOf(_propTypes2.default.number),
    paginationAfterGrid: _propTypes2.default.bool,
    paginationCountFormat: _propTypes2.default.func
};

exports.default = GridTable;