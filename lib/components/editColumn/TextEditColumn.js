'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _findInObject = require('find-in-object');

var _findInObject2 = _interopRequireDefault(_findInObject);

var _BaseEditColumn = require('./BaseEditColumn');

var _BaseEditColumn2 = _interopRequireDefault(_BaseEditColumn);

var _actions = require('../../actions');

var _reduxForm = require('redux-form');

var _fieldStatus = require('../../constants/fieldStatus');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by marvin.ruppelt on 20.09.17.
                                                                                                                                                                                                                              */

var TextEditColumn = function TextEditColumn(_ref) {
    var rowData = _ref.rowData,
        idx = _ref.idx,
        url = _ref.url,
        grid = _ref.grid,
        fieldSubmit = _ref.fieldSubmit,
        onChange = _ref.onChange,
        status = _ref.status,
        rest = _objectWithoutProperties(_ref, ['rowData', 'idx', 'url', 'grid', 'fieldSubmit', 'onChange', 'status']);

    var fieldStatus = (0, _findInObject2.default)(idx, status);
    return _react2.default.createElement(
        _BaseEditColumn2.default,
        _extends({ status: fieldStatus }, rest),
        _react2.default.createElement(_reduxForm.Field, {
            name: idx,
            component: 'input',
            className: 'form-control',
            onBlur: function onBlur(input, value) {
                fieldSubmit(grid, rowData, idx, url, value);
            },
            onFocus: function onFocus() {
                return onChange(grid, idx);
            },
            disabled: fieldStatus == _fieldStatus.STATUS_INSUBMISSION
        })
    );
};

TextEditColumn.propTypes = {
    rowData: _propTypes2.default.object,
    idx: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
};
var mapDispatch = function mapDispatch(dispatch) {
    return {
        fieldSubmit: function fieldSubmit(grid, rowData, idx, url, value) {
            dispatch((0, _actions.fieldInSubmission)(grid, idx));
            dispatch((0, _actions.submitField)({ grid: grid, rowData: rowData, idx: idx, url: url, value: value })).then(function (result) {
                dispatch((0, _actions.fieldSaved)(grid, idx));
            }).catch(function (error) {
                dispatch((0, _actions.fieldSubmissionFailed)(grid, idx));
            });
        },
        onChange: function onChange(grid, idx) {
            dispatch((0, _actions.fieldChanged)(grid, idx));
        }
    };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatch)(TextEditColumn);