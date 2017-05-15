'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PAGINATION_COUNT_FORMAT_FULL = exports.PAGINATION_COUNT_FORMAT_SHORT = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by rouven on 06.03.17.
                                                                                                                                                                                                                                                                   */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactPager = require('react-pager');

var _reactPager2 = _interopRequireDefault(_reactPager);

var _pagination = require('./propTypes/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PAGINATION_COUNT_FORMAT_SHORT = exports.PAGINATION_COUNT_FORMAT_SHORT = function PAGINATION_COUNT_FORMAT_SHORT(_ref) {
    var totalCount = _ref.totalCount;
    return totalCount + ' Zeile(n)';
};
var PAGINATION_COUNT_FORMAT_FULL = exports.PAGINATION_COUNT_FORMAT_FULL = function PAGINATION_COUNT_FORMAT_FULL(_ref2) {
    var currentPage = _ref2.currentPage,
        pageCount = _ref2.pageCount,
        perPage = _ref2.perPage,
        totalCount = _ref2.totalCount;

    var valueFrom = (currentPage - 1) * perPage + 1;
    var valueTo = currentPage * perPage;

    return valueFrom + ' bis ' + (valueTo < totalCount ? valueTo : totalCount) + ' von ' + totalCount + ' Einträgen';
};

var renderPageSizeOptions = function renderPageSizeOptions(pageSizes, perPage) {
    if (pageSizes.indexOf(perPage) === -1) {
        pageSizes.push(perPage);

        pageSizes.sort(function (a, b) {
            return a - b;
        });
    }

    return pageSizes.map(function (value, i) {
        return _react2.default.createElement(
            'option',
            _extends({}, value, { key: 'psso_' + i }),
            value
        );
    });
};

var Pagination = function Pagination(_ref3) {
    var grid = _ref3.grid,
        currentPage = _ref3.currentPage,
        pageCount = _ref3.pageCount,
        perPage = _ref3.perPage,
        totalCount = _ref3.totalCount,
        handlePageChanged = _ref3.handlePageChanged,
        handlePageSizeChanged = _ref3.handlePageSizeChanged,
        pageSizes = _ref3.pageSizes,
        paginationCountFormat = _ref3.paginationCountFormat;
    return _react2.default.createElement(
        'div',
        { className: 'row grid-before-table' },
        _react2.default.createElement(
            'div',
            { className: 'col-md-3' },
            _react2.default.createElement(
                'div',
                { className: 'grid-filter grid-filter--entries' },
                paginationCountFormat({ currentPage: currentPage, pageCount: pageCount, perPage: perPage, totalCount: totalCount })
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'col-md-6' },
            _react2.default.createElement(
                'div',
                { className: 'text-center' },
                _react2.default.createElement(_reactPager2.default, { total: pageCount,
                    current: currentPage - 1,
                    titles: {
                        first: 'Erste Seite',
                        prev: '\xAB',
                        prevSet: '...',
                        nextSet: '...',
                        next: '\xBB',
                        last: 'Letzte Seite'
                    },
                    visiblePages: 5,
                    onPageChanged: function onPageChanged(nextPage) {
                        return handlePageChanged(nextPage, grid);
                    }
                })
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'col-md-3 text-right' },
            _react2.default.createElement(
                'div',
                { className: 'grid-filter grid-filter--entries-per-page' },
                _react2.default.createElement(
                    'div',
                    { className: 'form-inline' },
                    _react2.default.createElement(
                        'label',
                        { htmlFor: 'pagesizeSelect' },
                        'Eintr\xE4ge pro Seite:'
                    ),
                    _react2.default.createElement(
                        'select',
                        {
                            value: perPage,
                            name: 'pagesizeSelect',
                            className: 'input-sm form-control',
                            onChange: function onChange(evt) {
                                return handlePageSizeChanged(evt, grid);
                            }
                        },
                        renderPageSizeOptions(pageSizes, perPage)
                    )
                )
            )
        )
    );
};

Pagination.defaultProps = {
    pageCount: 0,
    paginationCountFormat: PAGINATION_COUNT_FORMAT_SHORT
};

Pagination.propTypes = Object.assign({
    grid: _propTypes2.default.string.isRequired,
    pageSizes: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
    paginationCountFormat: _propTypes2.default.func
}, _pagination2.default);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        handlePageSizeChanged: function handlePageSizeChanged(evt, grid) {
            return dispatch((0, _actions.changePageSize)(evt, grid));
        },
        handlePageChanged: function handlePageChanged(nextPage, grid) {
            return dispatch((0, _actions.changePage)(nextPage, grid));
        }
    };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(Pagination);