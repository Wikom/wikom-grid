'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckboxHeaderComponent = function CheckboxHeaderComponent(_ref) {
    var grid = _ref.grid,
        checked = _ref.checked,
        onChange = _ref.onChange,
        allValues = _ref.allValues;
    return _react2.default.createElement(
        'th',
        { className: 'text-center' },
        _react2.default.createElement('input', {
            type: 'checkbox',
            name: 'row-is-selected',
            value: allValues,
            checked: checked,
            onChange: onChange
        })
    );
};

CheckboxHeaderComponent.defaultProps = {
    checked: false
};

exports.default = CheckboxHeaderComponent;