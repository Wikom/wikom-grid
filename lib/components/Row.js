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
 * Created by rouven on 24.02.17.
 */

var Row = function Row(_ref) {
    var children = _ref.children,
        grid = _ref.grid,
        rowData = _ref.rowData;
    return _react2.default.createElement(
        'tr',
        null,
        _react2.default.Children.map(children, function (child) {
            return _react2.default.cloneElement(child, { grid: grid, rowData: rowData });
        })
    );
};

Row.propTypes = {
    children: _propTypes2.default.node.isRequired,
    grid: _propTypes2.default.string,
    rowData: _propTypes2.default.object.isRequired
};

exports.default = Row;