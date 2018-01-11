'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RawCheckbox = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkbox = function Checkbox(_ref) {
    var input = _ref.input;
    return _react2.default.createElement(
        'label',
        null,
        _react2.default.createElement('input', _extends({}, input, {
            type: 'checkbox',
            value: '1',
            checked: input.value === '1',
            onChange: function onChange(evt) {
                return input.onChange(evt.target.checked ? '1' : '0');
            }
        })),
        'ja'
    );
};

exports.RawCheckbox = Checkbox;
exports.default = (0, _reactOnclickoutside2.default)(Checkbox, {
    handleClickOutside: function handleClickOutside(instance) {
        return function (evt) {
            return instance.props.input.onBlur();
        };
    }
});