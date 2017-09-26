'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _findInObject = require('find-in-object');

var _findInObject2 = _interopRequireDefault(_findInObject);

var _BaseColumn = require('./BaseColumn');

var _BaseColumn2 = _interopRequireDefault(_BaseColumn);

var _actions = require('../../actions');

var _reduxForm = require('redux-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by marvin.ruppelt on 20.09.17.
                                                                                                                                                                                                                              */

var TextEditColumn = function TextEditColumn(_ref) {
    var rowData = _ref.rowData,
        idx = _ref.idx,
        url = _ref.url,
        fieldSubmit = _ref.fieldSubmit,
        rest = _objectWithoutProperties(_ref, ['rowData', 'idx', 'url', 'fieldSubmit']);

    console.log('TextEditColumn', rest);

    return _react2.default.createElement(
        _BaseColumn2.default,
        rest,
        _react2.default.createElement(_reduxForm.Field, {
            name: idx,
            component: 'input',
            className: 'form-control',
            onBlur: function onBlur(input, value) {
                fieldSubmit(rowData, idx, url, value);
            }
        })
    );
};

TextEditColumn.propTypes = {
    rowData: _propTypes2.default.object,
    idx: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
};
var mapDispatch = function mapDispatch(dispatch) {
    return {
        fieldSubmit: function fieldSubmit(rowData, idx, url, value) {
            return dispatch((0, _actions.submitField)({ rowData: rowData, idx: idx, url: url, value: value }));
        }
    };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatch)(TextEditColumn);