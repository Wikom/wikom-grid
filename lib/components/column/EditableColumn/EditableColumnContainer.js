'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _EditableColumnComponent = require('./EditableColumnComponent');

var _EditableColumnComponent2 = _interopRequireDefault(_EditableColumnComponent);

var _actions = require('../../../actions');

var _Column = require('../Column');

var _Column2 = _interopRequireDefault(_Column);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mapState = function mapState(_ref, _ref2) {
    var grid = _ref.grid;
    var gridname = _ref2.grid,
        rowId = _ref2.rowId,
        colId = _ref2.colId,
        rowData = _ref2.rowData,
        idx = _ref2.idx;
    return {
        rowInEdit: grid[gridname].edit && grid[gridname].edit.rowId === rowId || false,
        cellInEdit: grid[gridname].edit && grid[gridname].edit.rowId === rowId && grid[gridname].edit.colId === colId || false,
        submitStatus: grid[gridname].edit && grid[gridname].edit.status && grid[gridname].edit.status[rowId] && grid[gridname].edit.status[rowId][colId] || null,
        changedRowData: grid[gridname].edit && grid[gridname].edit.values && grid[gridname].edit.values[rowId] && grid[gridname].edit.values[rowId][colId] && _extends({}, rowData, _defineProperty({}, idx, grid[gridname].edit.values[rowId][colId])) || null,
        hasValueChanged: grid[gridname].edit && grid[gridname].edit.values && grid[gridname].edit.values[rowId] && grid[gridname].edit.values[rowId][colId] && rowData[idx] && grid[gridname].edit.values[rowId][colId] !== rowData[idx] || false
    };
};

var mapDispatch = function mapDispatch(dispatch, _ref3) {
    var grid = _ref3.grid,
        rowId = _ref3.rowId,
        colId = _ref3.colId;
    return {
        onClick: function onClick() {
            return dispatch((0, _actions.editStart)(grid, rowId, colId));
        },
        onBlur: function onBlur() {
            return dispatch((0, _actions.editEnd)(grid, rowId, colId));
        }
    };
};

var EditableColumnContainer = (0, _reactRedux.connect)(mapState, mapDispatch)(_EditableColumnComponent2.default);

EditableColumnContainer.defaultProps = {
    formComponent: 'input',
    component: _Column2.default
};

EditableColumnContainer.propTypes = {
    name: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired,
    rowId: _propTypes2.default.number,
    colId: _propTypes2.default.number,
    rowData: _propTypes2.default.object,
    idx: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    component: _propTypes2.default.func,
    formComponent: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func])
};

exports.default = EditableColumnContainer;