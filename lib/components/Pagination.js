'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var renderPageSizeOptions = function renderPageSizeOptions() {
    var pageSizes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [5, 10, 25, 50];
    return pageSizes.map(function (value, i) {
        return _react2.default.createElement(
            'option',
            _extends({}, value, { key: 'psso_' + i }),
            value
        );
    });
};

var Pagination = function Pagination(_ref) {
    var grid = _ref.grid,
        currentPage = _ref.currentPage,
        pageCount = _ref.pageCount,
        perPage = _ref.perPage,
        totalCount = _ref.totalCount,
        handlePageChanged = _ref.handlePageChanged,
        handlePageSizeChanged = _ref.handlePageSizeChanged;
    return _react2.default.createElement(
        'div',
        { className: 'row grid-before-table' },
        _react2.default.createElement(
            'div',
            { className: 'col-md-3' },
            _react2.default.createElement(
                'div',
                { className: 'grid-filter' },
                totalCount,
                ' Zeile(n)'
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
                { className: 'grid-filter' },
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
                        renderPageSizeOptions()
                    )
                )
            )
        )
    );
};

Pagination.defaultProps = {
    pageCount: 0
};

Pagination.propTypes = Object.assign({
    grid: _propTypes2.default.string.isRequired
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