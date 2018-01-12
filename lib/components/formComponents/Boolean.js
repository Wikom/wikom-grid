'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BooleanWithNull = require('./BooleanWithNull');

var _BooleanWithNull2 = _interopRequireDefault(_BooleanWithNull);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Boolean = function Boolean(props) {
    return _react2.default.createElement(_BooleanWithNull2.default, _extends({ withNull: false }, props));
};

exports.default = Boolean;