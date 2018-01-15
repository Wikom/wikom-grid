'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GridFilterDefaultTemplate = require('./GridFilterDefaultTemplate');

var _GridFilterDefaultTemplate2 = _interopRequireDefault(_GridFilterDefaultTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var GridFilterComponent = function GridFilterComponent(_ref) {
    var handleSubmit = _ref.handleSubmit,
        onSubmit = _ref.onSubmit,
        children = _ref.children,
        Template = _ref.Template,
        rest = _objectWithoutProperties(_ref, ['handleSubmit', 'onSubmit', 'children', 'Template']);

    return children instanceof Array && children.length > 0 && _react2.default.createElement(
        'form',
        { onSubmit: handleSubmit(onSubmit) },
        _react2.default.createElement(
            Template,
            rest,
            children
        )
    );
};

GridFilterComponent.defaultProps = {
    Template: _GridFilterDefaultTemplate2.default
};

GridFilterComponent.propTypes = {
    handleSubmit: _propTypes2.default.func.isRequired,
    onSubmit: _propTypes2.default.func.isRequired,
    children: _propTypes2.default.node,
    Template: _propTypes2.default.func
};

exports.default = GridFilterComponent;