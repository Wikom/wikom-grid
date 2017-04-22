'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

var _reactSymbol = require('react-symbol');

var _reactSymbol2 = _interopRequireDefault(_reactSymbol);

var _reactConditional = require('react-conditional');

var _reactConditional2 = _interopRequireDefault(_reactConditional);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by rouven on 01.03.17.
                                                                                                                                                                                                                              */

var GridLink = function GridLink(_ref) {
    var symbol = _ref.symbol,
        to = _ref.to;
    return _react2.default.createElement(
        _reactRouterDom.Link,
        { to: to },
        _react2.default.createElement(_reactSymbol2.default, { symbol: symbol })
    );
};

var GridLinkWrapper = function GridLinkWrapper(_ref2) {
    var condition = _ref2.condition,
        props = _objectWithoutProperties(_ref2, ['condition']);

    return _react2.default.createElement(
        _reactConditional2.default,
        { condition: condition },
        _react2.default.createElement(GridLink, props)
    );
};

GridLinkWrapper.defaultProps = {
    condition: function condition() {
        return true;
    }
};

GridLinkWrapper.propTypes = {
    symbol: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired,
    to: _propTypes2.default.string.isRequired,
    condition: _propTypes2.default.func
};

exports.default = GridLinkWrapper;