'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by rouven on 24.02.17.
                                                                                                                                                                                                                              */

var Row = function Row(_ref) {
    var rowId = _ref.rowId,
        children = _ref.children,
        grid = _ref.grid,
        editable = _ref.editable,
        rowData = _ref.rowData,
        setNextEditRow = _ref.setNextEditRow,
        props = _objectWithoutProperties(_ref, ['rowId', 'children', 'grid', 'editable', 'rowData', 'setNextEditRow']);

    return _react2.default.createElement(
        'tr',
        null,
        _react2.default.Children.map(children, function (child) {
            return _react2.default.cloneElement(child, _extends({
                grid: grid,
                rowData: rowData,
                onClick: editable ? function () {
                    return setNextEditRow(grid, rowId);
                } : null
            }, props));
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
        setNextEditRow: function setNextEditRow(grid, index) {
            return dispatch((0, _actions.setNextEditRow)(grid, index));
        }
    };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(Row);