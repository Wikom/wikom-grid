'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _index = require('../../actions/index');

var _index2 = require('../Filter/index');

var _index3 = _interopRequireDefault(_index2);

var _GridFilterForm = require('./GridFilterForm');

var _GridFilterForm2 = _interopRequireDefault(_GridFilterForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref, _ref2) {
    var grid = _ref.grid;
    var gridname = _ref2.grid,
        initialValues = _ref2.initialValues,
        children = _ref2.children;
    return {
        form: gridname + 'Filter',
        initialValues: Object.assign({}, initialValues || {}, grid[gridname] && grid[gridname].filter),
        children: _react2.default.Children.map(children, function (child) {
            return _react2.default.isValidElement(child) && typeof child.type === 'function' ? _react2.default.cloneElement(child, { grid: gridname }) : child;
        })
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref3) {
    var grid = _ref3.grid,
        initialValues = _ref3.initialValues;
    return {
        onSubmit: function onSubmit(data) {
            return dispatch((0, _index.applyFilter)(data, grid));
        },
        clearFilter: function clearFilter() {
            return dispatch((0, _index.applyFilter)(initialValues || {}, grid));
        }
    };
};

var GridFilterContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_GridFilterForm2.default);

GridFilterContainer.propTypes = {
    grid: _propTypes2.default.string.isRequired,
    initialValues: _propTypes2.default.object,
    children: _propTypes2.default.node
};

exports.default = GridFilterContainer;