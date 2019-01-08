'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Created by rouven on 09.03.17.
                                                                                                                                                                                                                                                                               */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseColumn = function BaseColumn(_ref) {
    var className = _ref.className,
        onClick = _ref.onClick,
        children = _ref.children,
        cellWidth = _ref.cellWidth;

    var tdProps = { onClick: onClick };

    switch (typeof className === 'undefined' ? 'undefined' : _typeof(className)) {
        case 'object':
            if (className.td) {
                tdProps.className = className.td;
            }
            break;
        case 'string':
            tdProps.className = className;
            break;
    }

    return _react2.default.createElement(
        'td',
        tdProps,
        cellWidth ? _react2.default.createElement(
            'div',
            { style: { 'width': cellWidth } },
            children
        ) : children
    );
};

BaseColumn.propTypes = {
    className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
    children: _propTypes2.default.node,
    cellWidth: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

exports.default = BaseColumn;