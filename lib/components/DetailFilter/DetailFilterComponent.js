'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Filter = require('../Filter');

var _Filter2 = _interopRequireDefault(_Filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DetailFilterComponent = function DetailFilterComponent(_ref) {
    var grid = _ref.grid,
        name = _ref.name,
        className = _ref.className,
        children = _ref.children,
        withDetailFilter = _ref.withDetailFilter;
    return withDetailFilter && _react2.default.createElement(
        _Filter2.default,
        { name: name, className: className, grid: grid },
        children
    );
};

DetailFilterComponent.defaultProps = {
    className: 'col-sm-6 col-md-4 col-lg-3 form-group filter-element',
    withDetailFilter: false
};

DetailFilterComponent.propTypes = {
    name: _propTypes2.default.string.isRequired,
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    grid: _propTypes2.default.string.isRequired,
    withDetailFilter: _propTypes2.default.bool.isRequired
};
exports.default = DetailFilterComponent;