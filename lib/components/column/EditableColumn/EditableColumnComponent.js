'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _findInObject = require('find-in-object');

var _findInObject2 = _interopRequireDefault(_findInObject);

var _BaseColumn = require('../BaseColumn');

var _BaseColumn2 = _interopRequireDefault(_BaseColumn);

var _EditContainer = require('./EditContainer');

var _EditContainer2 = _interopRequireDefault(_EditContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
        props = _objectWithoutProperties(_ref, ['component', 'formComponent', 'cellInEdit', 'rowInEdit', 'idx', 'editRoute', 'submitStatus', 'rowData', 'changedRowData', 'hasValueChanged']);

    props.rowData = changedRowData || rowData;

    if (rowInEdit) {
        return _react2.default.createElement(
            _BaseColumn2.default,
            null,
            _react2.default.createElement(_EditContainer2.default, {
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
            })
        );
    }

    if (component) {
        if (hasValueChanged) {
            props.className = { td: 'text-success' };
        }
        return _react2.default.createElement(component, _extends({ idx: idx }, props));
    }

    return null;
};

EditableColumnComponent.defaultProps = {
    hasValueChanged: false
};

EditableColumnComponent.propTypes = {
    name: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired,
    rowData: _propTypes2.default.object,
    idx: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    component: _propTypes2.default.func,
    formComponent: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired,
    cellInEdit: _propTypes2.default.bool.isRequired,
    rowInEdit: _propTypes2.default.bool.isRequired,
    hasValueChanged: _propTypes2.default.bool
};

exports.default = EditableColumnComponent;