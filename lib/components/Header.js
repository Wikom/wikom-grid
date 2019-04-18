"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _withTooltip = _interopRequireDefault(require("with-tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Header = function Header(_ref) {
  var grid = _ref.grid,
      columns = _ref.columns,
      activeSort = _ref.activeSort,
      handleSort = _ref.handleSort;
  return _react["default"].createElement("tr", null, columns.map(function (column, key) {
    var _column$props = column.props,
        name = _column$props.name,
        className = _column$props.className,
        tooltip = _column$props.tooltip,
        idx = _column$props.idx,
        ThComponent = _column$props.ThComponent,
        _column$props$cellWid = _column$props.cellWidth,
        cellWidth = _column$props$cellWid === void 0 ? false : _column$props$cellWid,
        _column$props$sortabl = _column$props.sortable,
        sortable = _column$props$sortabl === void 0 ? true : _column$props$sortabl;

    if (ThComponent) {
      return _react["default"].createElement(ThComponent, {
        grid: grid,
        name: name,
        key: key,
        idx: idx,
        cellWidth: cellWidth
      });
    }

    var classNames = [];
    var thProps = {
      key: key
    };
    var sortOrder = null;

    switch (_typeof(className)) {
      case 'object':
        if (className.th) {
          classNames.push(className.th);
        }

        break;

      case 'string':
        classNames.push(className);
        break;
    }

    if (activeSort && activeSort.indexOf(idx) !== -1) {
      sortOrder = activeSort.indexOf(idx) === 0 ? 'asc' : 'desc';
      classNames.push('sort-' + sortOrder);
    }

    if (sortable === true && typeof handleSort === 'function') {
      thProps.onClick = function () {
        return handleSort(idx, sortOrder !== 'asc');
      };

      classNames.push('sortable');
    }

    thProps.className = classNames.join(' ');

    var thInner = _react["default"].createElement("span", {
      className: "table-head-title"
    }, (0, _withTooltip["default"])(tooltip)(name));

    return _react["default"].createElement("th", thProps, cellWidth ? _react["default"].createElement("div", {
      style: {
        'width': cellWidth
      }
    }, thInner) : thInner);
  }));
};

Header.propTypes = {
  columns: _propTypes["default"].node
};
var _default = Header;
exports["default"] = _default;