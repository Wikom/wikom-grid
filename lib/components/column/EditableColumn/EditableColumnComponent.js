"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _findInObject = _interopRequireDefault(require("find-in-object"));

var _BaseColumn = _interopRequireDefault(require("../BaseColumn"));

var _EditContainer = _interopRequireDefault(require("./EditContainer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var EditableColumnComponent = function EditableColumnComponent(_ref) {
  var component = _ref.component,
      formComponent = _ref.formComponent,
      cellInEdit = _ref.cellInEdit,
      rowInEdit = _ref.rowInEdit,
      idx = _ref.idx,
      editRoute = _ref.editRoute,
      submitStatus = _ref.submitStatus,
      rowData = _ref.rowData,
      changedRowData = _ref.changedRowData,
      hasValueChanged = _ref.hasValueChanged,
      props = _objectWithoutProperties(_ref, ["component", "formComponent", "cellInEdit", "rowInEdit", "idx", "editRoute", "submitStatus", "rowData", "changedRowData", "hasValueChanged"]);

  props.rowData = changedRowData || rowData;

  if (rowInEdit) {
    return _react["default"].createElement(_BaseColumn["default"], null, _react["default"].createElement(_EditContainer["default"], {
      idx: idx,
      component: formComponent,
      grid: props.grid,
      colId: props.colId,
      rowId: props.rowId,
      rowData: props.rowData,
      editRoute: editRoute,
      submitStatus: submitStatus,
      onFocus: props.onClick,
      onBlur: props.onBlur,
      cellInEdit: cellInEdit
    }));
  }

  if (component) {
    if (hasValueChanged) {
      props.className = {
        td: 'text-success'
      };
    }

    return _react["default"].createElement(component, _objectSpread({
      idx: idx
    }, props));
  }

  return null;
};

EditableColumnComponent.defaultProps = {
  hasValueChanged: false
};
EditableColumnComponent.propTypes = {
  name: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]).isRequired,
  rowData: _propTypes["default"].object,
  idx: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  component: _propTypes["default"].func,
  formComponent: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]).isRequired,
  cellInEdit: _propTypes["default"].bool.isRequired,
  rowInEdit: _propTypes["default"].bool.isRequired,
  hasValueChanged: _propTypes["default"].bool
};
var _default = EditableColumnComponent;
exports["default"] = _default;