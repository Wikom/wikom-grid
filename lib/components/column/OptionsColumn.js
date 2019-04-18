"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _findInObject = _interopRequireDefault(require("find-in-object"));

var _BaseColumn = _interopRequireDefault(require("./BaseColumn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var OptionsColumn = function OptionsColumn(_ref) {
  var name = _ref.name,
      rowData = _ref.rowData,
      idx = _ref.idx,
      options = _ref.options,
      rest = _objectWithoutProperties(_ref, ["name", "rowData", "idx", "options"]);

  return _react["default"].createElement(_BaseColumn["default"], rest, options[(0, _findInObject["default"])(idx, rowData)]);
};

OptionsColumn.propTypes = {
  name: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]).isRequired,
  rowData: _propTypes["default"].object,
  idx: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  options: _propTypes["default"].object.isRequired
};
var _default = OptionsColumn;
exports["default"] = _default;