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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CheckboxColumn = function CheckboxColumn(_ref) {
    var rowData = _ref.rowData,
        idx = _ref.idx,
        checked = _ref.checked,
        onChange = _ref.onChange,
        className = _ref.className,
        rest = _objectWithoutProperties(_ref, ['rowData', 'idx', 'checked', 'onChange', 'className']);

    return _react2.default.createElement(
        _BaseColumn2.default,
        _extends({}, rest, { className: (className ? className + ' ' : '') + 'text-center table__check-bulk' }),
        _react2.default.createElement('input', {
            type: 'checkbox',
            name: 'row-is-selected',
            value: (0, _findInObject2.default)(idx, rowData),
            checked: checked,
            onChange: onChange
        })
    );
};

CheckboxColumn.defaultProps = {
    checked: false
};

CheckboxColumn.propTypes = {
    rowData: _propTypes2.default.object,
    idx: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    checked: _propTypes2.default.bool
};

exports.default = CheckboxColumn;