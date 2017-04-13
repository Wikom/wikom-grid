'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _findInObject = require('find-in-object');

var _findInObject2 = _interopRequireDefault(_findInObject);

var _GridAction = require('../GridAction');

var _GridAction2 = _interopRequireDefault(_GridAction);

var _GridLink = require('../GridLink');

var _GridLink2 = _interopRequireDefault(_GridLink);

var _BaseColumn = require('./BaseColumn');

var _BaseColumn2 = _interopRequireDefault(_BaseColumn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by rouven on 01.03.17.
                                                                                                                                                                                                                              */

var createActions = function createActions(children, rowData, idx) {
    return _react2.default.Children.map(children, function (child) {
        if (_react2.default.isValidElement(child) && child.type === _GridAction2.default) {
            return _react2.default.cloneElement(child, {
                action: function action() {
                    return child.props.action((0, _findInObject2.default)(idx, rowData));
                }
            });
        }
        if (_react2.default.isValidElement(child) && child.type === _GridLink2.default) {
            return _react2.default.cloneElement(child, {
                to: child.props.to + '/' + (0, _findInObject2.default)(idx, rowData)
            });
        }
    });
};

var ActionColumn = function ActionColumn(_ref) {
    var name = _ref.name,
        rowData = _ref.rowData,
        idx = _ref.idx,
        children = _ref.children,
        rest = _objectWithoutProperties(_ref, ['name', 'rowData', 'idx', 'children']);

    var actions = createActions(children, rowData, idx);

    return _react2.default.createElement(
        _BaseColumn2.default,
        rest,
        actions
    );
};

ActionColumn.defaultProps = {
    idx: 'id',
    sortable: false,
    className: 'text-nowrap'
};

ActionColumn.propTypes = {
    name: _propTypes2.default.string.isRequired,
    rowData: _propTypes2.default.object,
    idx: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    children: _propTypes2.default.node,
    sortable: _propTypes2.default.bool
};

exports.default = ActionColumn;