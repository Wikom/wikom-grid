'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RawEditComponent = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reduxForm = require('redux-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    return _react2.default.createElement(
        'div',
        { className: wrapperClass },
        _react2.default.createElement(_reduxForm.Field, {
            autoFocus: cellInEdit,
            name: idx,
            component: component,
            className: 'form-control',
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
        })
    );
};

EditComponent.defaultProps = {
    component: 'input'
};

EditComponent.propTypes = {
    component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
    handleSubmit: _propTypes2.default.func,
    idx: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    dirty: _propTypes2.default.bool,
    onFocus: _propTypes2.default.func,
    onBlur: _propTypes2.default.func,
    cellInEdit: _propTypes2.default.bool,
    wrapperClass: _propTypes2.default.string,
    disabled: _propTypes2.default.bool
};

exports.RawEditComponent = EditComponent;
exports.default = (0, _reduxForm.reduxForm)()(EditComponent);