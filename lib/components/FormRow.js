'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _wikomData = require('wikom-data');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reduxForm = require('redux-form');

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormRow = function FormRow(_ref) {
    var grid = _ref.grid,
        rowData = _ref.rowData,
        editRoute = _ref.editRoute;
    return (0, _reduxForm.reduxForm)({
        form: grid + '_form',
        initialValues: rowData,
        submitHandler: function submitHandler(data) {
            return (0, _wikomData.submit)({ url: editRoute, data: data });
        }
    })(_Row2.default);
}; /**
    * Created by marvin.ruppelt on 24.09.17.
    */

FormRow.propTypes = {
    grid: _propTypes2.default.string.isRequired,
    editRoute: _propTypes2.default.string.isRequired,
    rowData: _propTypes2.default.object.isRequired
};

exports.default = FormRow;