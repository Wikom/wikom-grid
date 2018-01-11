'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _wikomData = require('wikom-data');

var _wikomData2 = _interopRequireDefault(_wikomData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ConnectedGridComponent = function ConnectedGridComponent(_ref) {
    var grid = _ref.grid,
        url = _ref.url,
        force = _ref.force,
        children = _ref.children,
        rest = _objectWithoutProperties(_ref, ['grid', 'url', 'force', 'children']);

    return _react2.default.createElement(
        _wikomData2.default,
        _extends({ name: grid, grid: grid, url: url, force: force }, rest),
        children
    );
};

exports.default = ConnectedGridComponent;