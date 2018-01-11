'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RawBooleanWithNull = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BooleanWithNull = function BooleanWithNull(_ref) {
    var input = _ref.input,
        withNull = _ref.withNull;

    var isTrue = [true, 'true', 1, '1', 'j', 'J'].indexOf(input.value) !== -1;
    var isFalse = withNull === false ? isTrue === false : [false, 'false', 0, '0', 'n', 'N'].indexOf(input.value) !== -1;
    var className = {
        indeterminateCheckbox: true,
        'form-control': true,
        checked: isTrue,
        unchecked: isFalse,
        indeterminate: withNull && !isTrue && !isFalse
    };
    var changeValue = function changeValue(evt) {
        return input.onChange(isTrue ? '0' : isFalse && withNull ? '-1' : '1');
    };

    return _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
            'fieldset',
            null,
            _react2.default.createElement('input', {
                type: 'hidden',
                name: input.name,
                value: input.value
            }),
            _react2.default.createElement('div', {
                onClick: changeValue,
                className: (0, _classnames2.default)(className)
            })
        )
    );
};

BooleanWithNull.defaultProps = {
    withNull: true
};

BooleanWithNull.propTypes = {
    withNull: _propTypes2.default.bool
};

exports.RawBooleanWithNull = BooleanWithNull;
exports.default = (0, _reactOnclickoutside2.default)(BooleanWithNull, {
    handleClickOutside: function handleClickOutside(instance) {
        return function (evt) {
            return instance.props.input.onBlur();
        };
    }
});