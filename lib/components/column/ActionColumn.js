"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _findInObject = _interopRequireDefault(require("find-in-object"));

var _GridAction = _interopRequireDefault(require("../GridAction"));

var _GridLink = _interopRequireDefault(require("../GridLink"));

var _BaseColumn = _interopRequireDefault(require("./BaseColumn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var createActions = function createActions(children, rowData, idx) {
  return _react["default"].Children.map(children, function (child) {
    if (_react["default"].isValidElement(child) && child.type === _GridAction["default"]) {
      return _react["default"].cloneElement(child, {
        action: function action() {
          return child.props.action((0, _findInObject["default"])(idx, rowData));
        },
        rowData: rowData,
        idx: idx
      });
    }

    if (_react["default"].isValidElement(child) && child.type === _GridLink["default"]) {
      return _react["default"].cloneElement(child, {
        to: child.props.to + '/' + (0, _findInObject["default"])(idx, rowData),
        rowData: rowData,
        idx: idx
      });
    }

    if (_react["default"].isValidElement(child) && typeof child.type === 'function') {
      return _react["default"].cloneElement(child, {
        rowData: rowData
      });
    }

    return child;
  });
};

var ActionColumn = function ActionColumn(_ref) {
  var name = _ref.name,
      rowData = _ref.rowData,
      idx = _ref.idx,
      children = _ref.children,
      className = _ref.className,
      onClick = _ref.onClick,
      rest = _objectWithoutProperties(_ref, ["name", "rowData", "idx", "children", "className", "onClick"]);

  var actions = createActions(children, rowData, idx);

  switch (_typeof(className)) {
    case 'string':
      className += ' table-actioncell';
      break;

    case 'object':
      if (className.td) {
        className = className.td + ' table-actioncell';
      }

      break;
  }

  return _react["default"].createElement(_BaseColumn["default"], _extends({}, rest, {
    className: className
  }), actions);
};

ActionColumn.defaultProps = {
  idx: 'id',
  sortable: false,
  className: 'text-nowrap'
};
ActionColumn.propTypes = {
  name: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]).isRequired,
  rowData: _propTypes["default"].object,
  idx: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  children: _propTypes["default"].node,
  sortable: _propTypes["default"].bool
};
var _default = ActionColumn;
exports["default"] = _default;