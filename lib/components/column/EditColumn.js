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

var _BaseColumn = require('./BaseColumn');

var _BaseColumn2 = _interopRequireDefault(_BaseColumn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by marvin.ruppelt on 19.09.17.
                                                                                                                                                                                                                              */

var EditColumn = function EditColumn(_ref) {
    var rowData = _ref.rowData,
        idx = _ref.idx,
        children = _ref.children,
        rest = _objectWithoutProperties(_ref, ['rowData', 'idx', 'children']);

    console.log('editcolumn', rowData, idx, children, rest);
    return _react2.default.createElement(
        _BaseColumn2.default,
        rest,
        'edit:',
        children
    );
};

EditColumn.propTypes = {
    rowData: _propTypes2.default.object,
    idx: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
};

exports.default = EditColumn;