"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RawBooleanWithNull = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactOnclickoutside = _interopRequireDefault(require("react-onclickoutside"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BooleanWithNull = function BooleanWithNull(_ref) {
  var input = _ref.input,
      withNull = _ref.withNull;
  var isTrue = [true, 'true', 1, '1', 'j', 'J'].indexOf(input.value) !== -1;
  var isFalse = withNull === false ? isTrue === false : [false, 'false', 0, '0', 'n', 'N'].indexOf(input.value) !== -1;
  var className = {
    indeterminateCheckbox: true,
    'form-control': true,
    checked: isTrue,
    unchecked: isFalse,
    indeterminate: withNull && !isTrue && !isFalse
  };

  var changeValue = function changeValue(evt) {
    return input.onChange(isTrue ? '0' : isFalse && withNull ? '-1' : '1');
  };

  return _react["default"].createElement("div", {
    className: "form-group"
  }, _react["default"].createElement("fieldset", null, _react["default"].createElement("input", {
    type: "hidden",
    name: input.name,
    value: input.value
  }), _react["default"].createElement("div", {
    onClick: changeValue,
    className: (0, _classnames["default"])(className)
  })));
};

exports.RawBooleanWithNull = BooleanWithNull;
BooleanWithNull.defaultProps = {
  withNull: true
};
BooleanWithNull.propTypes = {
  withNull: _propTypes["default"].bool
};

var _default = (0, _reactOnclickoutside["default"])(BooleanWithNull, {
  handleClickOutside: function handleClickOutside(instance) {
    return function (evt) {
      return instance.props.input.onBlur();
    };
  }
});

exports["default"] = _default;