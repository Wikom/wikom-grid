'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _CheckboxColumnComponent = require('./CheckboxColumnComponent');

var _CheckboxColumnComponent2 = _interopRequireDefault(_CheckboxColumnComponent);

var _CheckboxHeaderContainer = require('./CheckboxHeaderContainer');

var _CheckboxHeaderContainer2 = _interopRequireDefault(_CheckboxHeaderContainer);

var _findInObject = require('find-in-object');

var _findInObject2 = _interopRequireDefault(_findInObject);

var _index = require('../../../actions/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, _ref) {
    var grid = _ref.grid,
        idx = _ref.idx,
        rowData = _ref.rowData;
    return {
        checked: state.grid[grid] && state.grid[grid].selection && state.grid[grid].selection.indexOf((0, _findInObject2.default)(idx, rowData)) !== -1
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
    var grid = _ref2.grid;
    return {
        onChange: function onChange(evt) {
            return dispatch((0, _index.changeSelection)(grid, evt.target));
        }
    };
};

var CheckboxColumnContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_CheckboxColumnComponent2.default);

CheckboxColumnContainer.defaultProps = {
    idx: 'id',
    ThComponent: _CheckboxHeaderContainer2.default
};

exports.default = CheckboxColumnContainer;