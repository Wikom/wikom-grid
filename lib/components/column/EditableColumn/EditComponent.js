"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RawEditComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reduxForm = require("redux-form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var EditComponent = function EditComponent(_ref) {
  var component = _ref.component,
      handleSubmit = _ref.handleSubmit,
      idx = _ref.idx,
      dirty = _ref.dirty,
      onFocus = _ref.onFocus,
      _onBlur = _ref.onBlur,
      cellInEdit = _ref.cellInEdit,
      wrapperClass = _ref.wrapperClass,
      disabled = _ref.disabled;
  return _react["default"].createElement("div", {
    className: wrapperClass
  }, _react["default"].createElement(_reduxForm.Field, {
    autoFocus: cellInEdit,
    name: idx,
    component: component,
    className: "form-control",
    onFocus: onFocus,
    onBlur: function onBlur(evt, value, prev) {
      if (dirty) {
        handleSubmit();
      }

      _onBlur();
    },
    disabled: disabled,
    normalize: function normalize(v) {
      return typeof v === 'boolean' ? v === true ? '1' : '0' : v;
    }
  }));
};

exports.RawEditComponent = EditComponent;
EditComponent.defaultProps = {
  component: 'input'
};
EditComponent.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  handleSubmit: _propTypes["default"].func,
  idx: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  dirty: _propTypes["default"].bool,
  onFocus: _propTypes["default"].func,
  onBlur: _propTypes["default"].func,
  cellInEdit: _propTypes["default"].bool,
  wrapperClass: _propTypes["default"].string,
  disabled: _propTypes["default"].bool
};

var _default = (0, _reduxForm.reduxForm)()(EditComponent);

exports["default"] = _default;