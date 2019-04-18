"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDatepicker = _interopRequireDefault(require("react-datepicker"));

require("react-datepicker/dist/react-datepicker.css");

var _moment = _interopRequireDefault(require("moment"));

var _de = _interopRequireDefault(require("moment/locale/de"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DatePicker = function DatePicker(_ref) {
  var input = _ref.input,
      placeholder = _ref.placeholder,
      defaultValue = _ref.defaultValue,
      dateFormat = _ref.dateFormat,
      autoFocus = _ref.autoFocus;
  var value = input.value && _moment["default"].utc(input.value, [dateFormat, 'YYYY-MM-DD', _moment["default"].ISO_8601]) || null;
  var valueForPicker = value && value.format(dateFormat) || '';

  var handleChange = function handleChange(value, evt) {
    var formatted = value && _moment["default"].utc(value, [dateFormat, 'YYYY-MM-DD', _moment["default"].ISO_8601]);

    input.onChange(value && value.format('YYYY-MM-DD') || '', evt);
  };

  return _react["default"].createElement(_reactDatepicker["default"], _extends({}, input, {
    onChange: handleChange,
    locale: "de-de",
    dateFormat: dateFormat,
    className: "form-control",
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
  className: _propTypes["default"].string,
  dateFormat: _propTypes["default"].string
};
var _default = DatePicker;
exports["default"] = _default;