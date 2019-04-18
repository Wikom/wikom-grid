"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RawCheckbox = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactOnclickoutside = _interopRequireDefault(require("react-onclickoutside"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Checkbox = function Checkbox(_ref) {
  var input = _ref.input;
  return _react["default"].createElement("label", null, _react["default"].createElement("input", _extends({}, input, {
    type: "checkbox",
    value: "1",
    checked: input.value === '1',
    onChange: function onChange(evt) {
      return input.onChange(evt.target.checked ? '1' : '0');
    }
  })), "ja");
};

exports.RawCheckbox = Checkbox;

var _default = (0, _reactOnclickoutside["default"])(Checkbox, {
  handleClickOutside: function handleClickOutside(instance) {
    return function (evt) {
      return instance.props.input.onBlur();
    };
  }
});

exports["default"] = _default;