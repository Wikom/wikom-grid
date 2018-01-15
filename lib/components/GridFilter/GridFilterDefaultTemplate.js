'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSymbol = require('react-symbol');

var _reactSymbol2 = _interopRequireDefault(_reactSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridFilterDefaultTemplate = function GridFilterDefaultTemplate(_ref) {
    var clearFilter = _ref.clearFilter,
        children = _ref.children;
    return _react2.default.createElement(
        'div',
        { className: 'box box-default box-solid grid-search' },
        _react2.default.createElement(
            'div',
            { className: 'box-header with-border' },
            _react2.default.createElement(
                'h3',
                { className: 'box-title' },
                'Filter'
            ),
            _react2.default.createElement(
                'div',
                { className: 'box-tools pull-right' },
                _react2.default.createElement(
                    'button',
                    { type: 'button', onClick: clearFilter,
                        className: 'btn btn-xs btn-default btn-filterReset' },
                    _react2.default.createElement(_reactSymbol2.default, { symbol: 'undo' }),
                    ' Filter zur\xFCcksetzen'
                )
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'box-body' },
            _react2.default.createElement(
                'div',
                { id: 'filter_row', className: 'row' },
                children
            ),
            _react2.default.createElement(
                'div',
                { id: 'filter_apply_row', className: 'filterapply-wrapper' },
                _react2.default.createElement(
                    'button',
                    { type: 'submit', className: 'btn btn-sm btn-primary' },
                    _react2.default.createElement(_reactSymbol2.default, { symbol: 'filter' }),
                    'Filter anwenden'
                )
            )
        )
    );
};

exports.default = GridFilterDefaultTemplate;