'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _CheckboxHeaderComponent = require('./CheckboxHeaderComponent');

var _CheckboxHeaderComponent2 = _interopRequireDefault(_CheckboxHeaderComponent);

var _index = require('../../../actions/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToHeaderProps = function mapStateToHeaderProps(state, _ref) {
    var grid = _ref.grid,
        idx = _ref.idx;
    return {
        allValues: state.grid[grid] && state.grid[grid].data ? JSON.stringify(state.grid[grid].data.map(function (value) {
            return value[idx];
        })) : '',
        checked: (state.grid[grid] && state.grid[grid].data && state.grid[grid].data.length > 0 && state.grid[grid].data.length === state.grid[grid].selection.length) === true
    };
};

var mapDispatchToHeaderProps = function mapDispatchToHeaderProps(dispatch, _ref2) {
    var grid = _ref2.grid;
    return {
        onChange: function onChange(evt) {
            return dispatch((0, _index.changeSelection)(grid, evt.target));
        }
    };
};

var CheckboxHeaderContainer = (0, _reactRedux.connect)(mapStateToHeaderProps, mapDispatchToHeaderProps)(_CheckboxHeaderComponent2.default);

exports.default = CheckboxHeaderContainer;