'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Created by rouven on 24.02.17.
                                                                                                                                                                                                                                                                               */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withTooltip = require('with-tooltip');

var _withTooltip2 = _interopRequireDefault(_withTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header(_ref) {
    var grid = _ref.grid,
        columns = _ref.columns,
        activeSort = _ref.activeSort,
        handleSort = _ref.handleSort;
    return _react2.default.createElement(
        'tr',
        null,
        columns.map(function (column, key) {
            var _column$props = column.props,
                name = _column$props.name,
                className = _column$props.className,
                tooltip = _column$props.tooltip,
                idx = _column$props.idx,
                ThComponent = _column$props.ThComponent,
                _column$props$sortabl = _column$props.sortable,
                sortable = _column$props$sortabl === undefined ? true : _column$props$sortabl;


            if (ThComponent) {
                return _react2.default.createElement(ThComponent, { grid: grid, name: name, key: key, idx: idx });
            }

            var classNames = [];
            var thProps = {
                key: key
            };
            var sortOrder = null;

            switch (typeof className === 'undefined' ? 'undefined' : _typeof(className)) {
                case 'object':
                    if (className.th) {
                        classNames.push(className.th);
                    }
                    break;
                case 'string':
                    classNames.push(className);
                    break;
            }

            if (activeSort && activeSort.indexOf(idx) !== -1) {
                sortOrder = activeSort.indexOf(idx) === 0 ? 'asc' : 'desc';
                classNames.push('sort-' + sortOrder);
            }

            if (sortable === true && typeof handleSort === 'function') {
                thProps.onClick = function () {
                    return handleSort(idx, sortOrder !== 'asc');
                };
                classNames.push('sortable');
            }

            thProps.className = classNames.join(' ');

            return _react2.default.createElement(
                'th',
                thProps,
                _react2.default.createElement(
                    'span',
                    { className: 'table-head-title' },
                    (0, _withTooltip2.default)(tooltip)(name)
                )
            );
        })
    );
};

Header.propTypes = {
    columns: _propTypes2.default.node
};

exports.default = Header;