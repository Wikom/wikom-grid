"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _reactNumberFormat = _interopRequireDefault(require("react-number-format"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Datum = function Datum(_ref) {
  var input = _ref.input;

  var handleChange = function handleChange(evt) {
    var value = evt.target.value;
    var valueAsMoment = value && (0, _moment["default"])(value, ['DD.MM.YYYY', 'YYYY-MM-DD', _moment["default"].ISO_8601], true);
    var valueFormatted = _moment["default"].isMoment(valueAsMoment) && valueAsMoment.isValid() ? valueAsMoment.format('YYYY-MM-DD') : value;
    return input.onChange(valueFormatted, evt);
  };

  var handleBlur = function handleBlur(evt) {
    var value = evt.target.value;
    var valueAsMoment = value && (0, _moment["default"])(value, ['DD.MM.YYYY', 'YYYY-MM-DD', _moment["default"].ISO_8601], true);
    var valueFormatted = _moment["default"].isMoment(valueAsMoment) && valueAsMoment.isValid() ? valueAsMoment.format('YYYY-MM-DD') : '';
    input.onChange(valueFormatted);
    return input.onBlur();
  };

  var valueAsMoment = input.value && (0, _moment["default"])(input.value, ['DD.MM.YYYY', 'YYYY-MM-DD', _moment["default"].ISO_8601], true);
  var valueFormatted = _moment["default"].isMoment(valueAsMoment) && valueAsMoment.isValid() ? valueAsMoment.format('DD.MM.YYYY') : input.value;
  return _react["default"].createElement("div", {
    className: "input-group"
  }, _react["default"].createElement("input", {
    type: "hidden",
    name: input.name,
    value: input.value
  }), _react["default"].createElement(_reactNumberFormat["default"], _extends({}, input, {
    name: "".concat(input.name, "_formatted"),
    value: valueFormatted,
    onChange: handleChange,
    onBlur: handleBlur,
    format: "##.##.####",
    placeholder: "TT.MM.JJJJ",
    mask: "_",
    className: "form-control"
  })));
};

var _default = Datum;
exports["default"] = _default;