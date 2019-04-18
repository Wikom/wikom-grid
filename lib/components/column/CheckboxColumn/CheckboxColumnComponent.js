"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _findInObject = _interopRequireDefault(require("find-in-object"));

var _BaseColumn = _interopRequireDefault(require("../BaseColumn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var CheckboxColumn = function CheckboxColumn(_ref) {
  var rowData = _ref.rowData,
      idx = _ref.idx,
      checked = _ref.checked,
      onChange = _ref.onChange,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ["rowData", "idx", "checked", "onChange", "className"]);

  return _react["default"].createElement(_BaseColumn["default"], _extends({}, rest, {
    className: (className ? className + ' ' : '') + 'text-center table__check-bulk'
  }), _react["default"].createElement("input", {
    type: "checkbox",
    name: "row-is-selected",
    value: (0, _findInObject["default"])(idx, rowData),
    checked: checked,
    onChange: onChange
  }));
};

CheckboxColumn.defaultProps = {
  checked: false
};
CheckboxColumn.propTypes = {
  rowData: _propTypes["default"].object,
  idx: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  checked: _propTypes["default"].bool
};
var _default = CheckboxColumn;
exports["default"] = _default;