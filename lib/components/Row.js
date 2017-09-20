'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by rouven on 24.02.17.
 */

var Row = function Row(_ref) {
    var rowId = _ref.rowId,
        children = _ref.children,
        grid = _ref.grid,
        editable = _ref.editable,
        rowData = _ref.rowData,
        setEditRow = _ref.setEditRow;
    return _react2.default.createElement(
        'tr',
        null,
        _react2.default.Children.map(children, function (child) {
            return _react2.default.cloneElement(child, {
                grid: grid,
                rowData: rowData,
                onClick: editable ? function () {
                    return setEditRow(grid, rowId);
                } : null
            });
        })
    );
};

Row.propTypes = {
    children: _propTypes2.default.node.isRequired,
    grid: _propTypes2.default.string,
    editable: _propTypes2.default.bool,
    rowData: _propTypes2.default.object.isRequired
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        setEditRow: function setEditRow(grid, index) {
            return dispatch((0, _actions.setEditRow)(grid, index));
        }
    };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(Row);