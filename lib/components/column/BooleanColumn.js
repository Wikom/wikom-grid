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

var _reactSymbol = require('react-symbol');

var _reactSymbol2 = _interopRequireDefault(_reactSymbol);

var _BaseColumn = require('./BaseColumn');

var _BaseColumn2 = _interopRequireDefault(_BaseColumn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by marvinruppelt on 02.06.17.
                                                                                                                                                                                                                              */

var BooleanColumn = function BooleanColumn(_ref) {
    var name = _ref.name,
        rowData = _ref.rowData,
        idx = _ref.idx,
        withNull = _ref.withNull,
        trueLabel = _ref.trueLabel,
        falseLabel = _ref.falseLabel,
        nullLabel = _ref.nullLabel,
        rest = _objectWithoutProperties(_ref, ['name', 'rowData', 'idx', 'withNull', 'trueLabel', 'falseLabel', 'nullLabel']);

    var value = (0, _findInObject2.default)(idx, rowData);
    var isTrue = [true, 'true', 1, '1', 'j', 'J'].indexOf(value) !== -1;
    var isFalse = withNull === false ? isTrue === false : [false, 'false', 0, '0', 'n', 'N'].indexOf(value) !== -1;

    return _react2.default.createElement(
        _BaseColumn2.default,
        rest,
        isTrue === true ? trueLabel : isFalse === true ? falseLabel : nullLabel
    );
};

BooleanColumn.defaultProps = {
    withNull: false,
    trueLabel: _react2.default.createElement(_reactSymbol2.default, { symbol: 'check-square-o' }),
    falseLabel: _react2.default.createElement(_reactSymbol2.default, { symbol: 'square-o' }),
    nullLabel: _react2.default.createElement(_reactSymbol2.default, { symbol: { symbol: 'question', className: 'text-muted' } })
};

BooleanColumn.propTypes = {
    name: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired,
    rowData: _propTypes2.default.object,
    idx: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    withNull: _propTypes2.default.bool,
    trueLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
    falseLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
    nullLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element])
};

exports.default = BooleanColumn;