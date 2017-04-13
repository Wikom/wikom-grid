'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSymbol = require('react-symbol');

var _reactSymbol2 = _interopRequireDefault(_reactSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridAction = function GridAction(_ref) {
    var symbol = _ref.symbol,
        action = _ref.action;
    return _react2.default.createElement(
        'a',
        { onClick: action },
        _react2.default.createElement(_reactSymbol2.default, { symbol: symbol })
    );
}; /**
    * Created by rouven on 01.03.17.
    */

GridAction.propTypes = {
    symbol: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired,
    action: _propTypes2.default.func.isRequired
};

exports.default = GridAction;