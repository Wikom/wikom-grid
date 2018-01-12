'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDatepicker = require('react-datepicker');

var _reactDatepicker2 = _interopRequireDefault(_reactDatepicker);

require('react-datepicker/dist/react-datepicker.css');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _de = require('moment/locale/de');

var _de2 = _interopRequireDefault(_de);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePicker = function DatePicker(_ref) {
    var input = _ref.input,
        placeholder = _ref.placeholder,
        defaultValue = _ref.defaultValue,
        dateFormat = _ref.dateFormat,
        autoFocus = _ref.autoFocus;

    var value = input.value && _moment2.default.utc(input.value, [dateFormat, 'YYYY-MM-DD', _moment2.default.ISO_8601]) || null;
    var valueForPicker = value && value.format(dateFormat) || '';
    var handleChange = function handleChange(value, evt) {
        var formatted = value && _moment2.default.utc(value, [dateFormat, 'YYYY-MM-DD', _moment2.default.ISO_8601]);

        input.onChange(value && value.format('YYYY-MM-DD') || '', evt);
    };

    return _react2.default.createElement(_reactDatepicker2.default, _extends({}, input, {
        onChange: handleChange,
        locale: 'de-de',
        dateFormat: dateFormat,
        className: 'form-control',
        value: valueForPicker,
        selected: value,
        autoFocus: autoFocus
    }));
};

DatePicker.defaultProps = {
    className: 'form-control',
    dateFormat: 'DD.MM.YYYY'
};

DatePicker.propTypes = {
    className: _propTypes2.default.string,
    dateFormat: _propTypes2.default.string
};

exports.default = DatePicker;