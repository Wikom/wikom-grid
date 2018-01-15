'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSymbol = require('react-symbol');

var _reactSymbol2 = _interopRequireDefault(_reactSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridFilterDetailTemplate = function GridFilterDetailTemplate(_ref) {
    var clearFilter = _ref.clearFilter,
        withDetailFilter = _ref.withDetailFilter,
        showDetailFilter = _ref.showDetailFilter,
        hideDetailFilter = _ref.hideDetailFilter,
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
                    {
                        type: 'button',
                        onClick: clearFilter,
                        className: 'btn btn-xs btn-default btn-filterReset'
                    },
                    _react2.default.createElement(_reactSymbol2.default, { symbol: 'undo' }),
                    ' Filter zur\xFCcksetzen'
                ),
                withDetailFilter ? _react2.default.createElement(
                    'button',
                    {
                        type: 'button',
                        onClick: hideDetailFilter,
                        className: 'btn btn-xs btn-default btn-filterDetailToggle'
                    },
                    _react2.default.createElement(_reactSymbol2.default, { symbol: 'minus-circle' }),
                    ' Detailfilter ausblenden'
                ) : _react2.default.createElement(
                    'button',
                    {
                        type: 'button',
                        onClick: showDetailFilter,
                        className: 'btn btn-xs btn-default btn-filterDetailToggle'
                    },
                    _react2.default.createElement(_reactSymbol2.default, { symbol: 'plus-circle' }),
                    ' Detailfilter anzeigen'
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

exports.default = GridFilterDetailTemplate;