'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by rouven on 02.03.17.
 */

var FullRow = function FullRow(_ref) {
    var colSpan = _ref.colSpan,
        children = _ref.children;
    return _react2.default.createElement(
        'tr',
        { key: '1' },
        _react2.default.createElement(
            'td',
            { colSpan: colSpan, className: 'text-center' },
            children
        )
    );
};

FullRow.propTypes = {
    colSpan: _propTypes2.default.number.isRequired,
    children: _propTypes2.default.node
};

exports.default = FullRow;