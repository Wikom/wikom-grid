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

var _reactConditional = require('react-conditional');

var _reactConditional2 = _interopRequireDefault(_reactConditional);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by rouven on 01.03.17.
                                                                                                                                                                                                                              */

var GridAction = function GridAction(_ref) {
    var symbol = _ref.symbol,
        action = _ref.action;
    return _react2.default.createElement(
        'a',
        { onClick: action },
        _react2.default.createElement(_reactSymbol2.default, { symbol: symbol })
    );
};

var GridActionWrapper = function GridActionWrapper(_ref2) {
    var condition = _ref2.condition,
        props = _objectWithoutProperties(_ref2, ['condition']);

    return _react2.default.createElement(
        _reactConditional2.default,
        { condition: condition },
        _react2.default.createElement(GridAction, props)
    );
};

GridActionWrapper.defaultProps = {
    condition: function condition() {
        return true;
    }
};

GridActionWrapper.propTypes = {
    symbol: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired,
    action: _propTypes2.default.func.isRequired,
    condition: _propTypes2.default.func
};

exports.default = GridActionWrapper;