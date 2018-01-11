'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by rouven on 24.02.17.
                                                                                                                                                                                                                              */

var Row = function Row(_ref) {
    var children = _ref.children,
        grid = _ref.grid,
        rowData = _ref.rowData,
        props = _objectWithoutProperties(_ref, ['children', 'grid', 'rowData']);

    return _react2.default.createElement(
        'tr',
        null,
        _react2.default.Children.map(children, function (child, colId) {
            return _react2.default.cloneElement(child, _extends({
                grid: grid,
                rowData: rowData,
                colId: colId
            }, props));
        })
    );
};

Row.propTypes = {
    children: _propTypes2.default.node.isRequired,
    grid: _propTypes2.default.string,
    rowData: _propTypes2.default.object.isRequired
};

exports.default = Row;