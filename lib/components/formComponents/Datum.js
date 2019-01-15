'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactNumberFormat = require('react-number-format');

var _reactNumberFormat2 = _interopRequireDefault(_reactNumberFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Datum = function Datum(_ref) {
    var input = _ref.input;

    var handleChange = function handleChange(evt) {
        var value = evt.target.value;
        var valueAsMoment = value && (0, _moment2.default)(value, ['DD.MM.YYYY', 'YYYY-MM-DD', _moment2.default.ISO_8601], true);
        var valueFormatted = _moment2.default.isMoment(valueAsMoment) && valueAsMoment.isValid() ? valueAsMoment.format('YYYY-MM-DD') : value;

        return input.onChange(valueFormatted, evt);
    };

    var handleBlur = function handleBlur(evt) {
        var value = evt.target.value;
        var valueAsMoment = value && (0, _moment2.default)(value, ['DD.MM.YYYY', 'YYYY-MM-DD', _moment2.default.ISO_8601], true);
        var valueFormatted = _moment2.default.isMoment(valueAsMoment) && valueAsMoment.isValid() ? valueAsMoment.format('YYYY-MM-DD') : '';

        input.onChange(valueFormatted);

        return input.onBlur();
    };

    var valueAsMoment = input.value && (0, _moment2.default)(input.value, ['DD.MM.YYYY', 'YYYY-MM-DD', _moment2.default.ISO_8601], true);
    var valueFormatted = _moment2.default.isMoment(valueAsMoment) && valueAsMoment.isValid() ? valueAsMoment.format('DD.MM.YYYY') : input.value;

    return _react2.default.createElement(
        'div',
        { className: 'input-group' },
        _react2.default.createElement('input', {
            type: 'hidden',
            name: input.name,
            value: input.value
        }),
        _react2.default.createElement(_reactNumberFormat2.default, _extends({}, input, {
            name: input.name + '_formatted',
            value: valueFormatted,
            onChange: handleChange,
            onBlur: handleBlur,
            format: '##.##.####',
            placeholder: 'TT.MM.JJJJ',
            mask: '_',
            className: 'form-control'
        }))
    );
};

exports.default = Datum;