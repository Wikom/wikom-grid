"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _findInObject = _interopRequireDefault(require("find-in-object"));

var _reactSymbol = _interopRequireDefault(require("react-symbol"));

var _BaseColumn = _interopRequireDefault(require("./BaseColumn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var BooleanColumn = function BooleanColumn(_ref) {
  var name = _ref.name,
      rowData = _ref.rowData,
      idx = _ref.idx,
      withNull = _ref.withNull,
      trueLabel = _ref.trueLabel,
      falseLabel = _ref.falseLabel,
      nullLabel = _ref.nullLabel,
      rest = _objectWithoutProperties(_ref, ["name", "rowData", "idx", "withNull", "trueLabel", "falseLabel", "nullLabel"]);

  var value = (0, _findInObject["default"])(idx, rowData);
  var isTrue = [true, 'true', 1, '1', 'j', 'J'].indexOf(value) !== -1;
  var isFalse = withNull === false ? isTrue === false : [false, 'false', 0, '0', 'n', 'N'].indexOf(value) !== -1;
  return _react["default"].createElement(_BaseColumn["default"], rest, isTrue === true ? trueLabel : isFalse === true ? falseLabel : nullLabel);
};

BooleanColumn.defaultProps = {
  withNull: false,
  trueLabel: _react["default"].createElement(_reactSymbol["default"], {
    symbol: "check-square-o"
  }),
  falseLabel: _react["default"].createElement(_reactSymbol["default"], {
    symbol: "square-o"
  }),
  nullLabel: _react["default"].createElement(_reactSymbol["default"], {
    symbol: {
      symbol: 'question',
      className: 'text-muted'
    }
  })
};
BooleanColumn.propTypes = {
  name: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]).isRequired,
  rowData: _propTypes["default"].object,
  idx: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  withNull: _propTypes["default"].bool,
  trueLabel: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element]),
  falseLabel: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element]),
  nullLabel: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element])
};
var _default = BooleanColumn;
exports["default"] = _default;