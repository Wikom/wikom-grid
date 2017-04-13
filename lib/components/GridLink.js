'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _reactSymbol = require('react-symbol');

var _reactSymbol2 = _interopRequireDefault(_reactSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridLink = function GridLink(_ref) {
    var symbol = _ref.symbol,
        to = _ref.to;
    return _react2.default.createElement(
        _reactRouterDom.Link,
        { to: to },
        _react2.default.createElement(_reactSymbol2.default, { symbol: symbol })
    );
}; /**
    * Created by rouven on 01.03.17.
    */

GridLink.propTypes = {
    symbol: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]).isRequired,
    to: _react.PropTypes.string.isRequired
};

exports.default = GridLink;