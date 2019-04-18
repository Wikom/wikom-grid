"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CheckboxHeaderComponent = function CheckboxHeaderComponent(_ref) {
  var grid = _ref.grid,
      checked = _ref.checked,
      onChange = _ref.onChange,
      allValues = _ref.allValues,
      cellWidth = _ref.cellWidth;

  var input = _react["default"].createElement("input", {
    type: "checkbox",
    name: "row-is-selected",
    value: allValues,
    checked: checked,
    onChange: onChange
  });

  return _react["default"].createElement("th", {
    className: "text-center"
  }, cellWidth ? _react["default"].createElement("div", {
    style: {
      'width': cellWidth
    }
  }, input) : input);
};

CheckboxHeaderComponent.defaultProps = {
  cellWidth: false,
  checked: false
};
var _default = CheckboxHeaderComponent;
exports["default"] = _default;