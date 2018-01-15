'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _GridFilterComponent = require('./GridFilterComponent');

var _GridFilterComponent2 = _interopRequireDefault(_GridFilterComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridFilterForm = (0, _reduxForm.reduxForm)({
    enableReinitialize: true
})(_GridFilterComponent2.default);

exports.default = GridFilterForm;