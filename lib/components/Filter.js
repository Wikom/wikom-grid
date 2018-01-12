'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by rouven on 06.04.17.
 */

var Filter = function Filter(_ref) {
    var children = _ref.children,
        className = _ref.className;
    return _react2.default.createElement(
        'div',
        { className: className },
        children
    );
};

Filter.defaultProps = {
    className: 'col-sm-6 col-md-4 col-lg-3 form-group filter-element'
};

Filter.propTypes = {
    name: _propTypes2.default.string.isRequired,
    children: _propTypes2.default.node,
    className: _propTypes2.default.string
};

exports.default = Filter;