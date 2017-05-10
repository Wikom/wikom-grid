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
                                                                                                                                                                                                                              * Created by rouven on 08.03.17.
                                                                                                                                                                                                                              */

var SymbolColumn = function SymbolColumn(_ref) {
    var name = _ref.name,
        rowData = _ref.rowData,
        idx = _ref.idx,
        symbols = _ref.symbols,
        rest = _objectWithoutProperties(_ref, ['name', 'rowData', 'idx', 'symbols']);

    var symbol = symbols[(0, _findInObject2.default)(idx, rowData)];

    return _react2.default.createElement(
        _BaseColumn2.default,
        rest,
        symbol ? _react2.default.createElement(_reactSymbol2.default, { symbol: symbol }) : null
    );
};

SymbolColumn.propTypes = {
    name: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired,
    rowData: _propTypes2.default.object,
    idx: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    symbols: _propTypes2.default.object.isRequired
};

exports.default = SymbolColumn;