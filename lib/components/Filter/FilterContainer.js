'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _FilterComponent = require('./FilterComponent');

var _FilterComponent2 = _interopRequireDefault(_FilterComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapState = function mapState(_ref, _ref2) {
    var grid = _ref.grid;
    var gridname = _ref2.grid,
        name = _ref2.name,
        className = _ref2.className;
    return {
        className: grid[gridname] && grid[gridname].filter.hasOwnProperty(name) && grid[gridname].filter[name] !== null && grid[gridname].filter[name] !== "" && className + ' filter_active' || className
    };
};

var FilterContainer = (0, _reactRedux.connect)(mapState)(_FilterComponent2.default);

FilterContainer.defaultProps = {
    className: 'col-sm-6 col-md-4 col-lg-3 form-group filter-element'
};

FilterContainer.propTypes = {
    name: _propTypes2.default.string.isRequired,
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    grid: _propTypes2.default.string
};

exports.default = FilterContainer;