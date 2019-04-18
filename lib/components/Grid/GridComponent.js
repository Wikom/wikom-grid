"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Columns = _interopRequireDefault(require("../Columns"));

var _Row = _interopRequireDefault(require("../Row"));

var _Header = _interopRequireDefault(require("../Header"));

var _FullRow = _interopRequireDefault(require("../FullRow"));

var _reactLoading = _interopRequireDefault(require("react-loading"));

var _Pagination = _interopRequireDefault(require("../Pagination"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GridComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GridComponent, _React$Component);

  function GridComponent(props) {
    var _this;

    _classCallCheck(this, GridComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GridComponent).call(this, props));

    _this.createColumns(props.children);

    _this._rows = _this.buildRows(props);
    return _this;
  }

  _createClass(GridComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.initializeGrid(this.props.grid);
      this.props.changeData(this.props.grid, this.props.data);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.grid !== nextProps.grid) {
        this.props.destroyGrid(this.props.grid);
        this.props.initializeGrid(nextProps.grid);
        this.createColumns(nextProps.children);
      }

      if (JSON.stringify(this.props.isLoading) !== JSON.stringify(nextProps.isLoading) || JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
        this.props.changeData(nextProps.grid, nextProps.data);
        this._rows = this.buildRows(nextProps);
      } else if (JSON.stringify(this.props.selection) !== JSON.stringify(nextProps.selection)) {
        this._rows = this.buildRows(nextProps);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.destroyGrid(this.props.grid);
    }
  }, {
    key: "createColumns",
    value: function createColumns(children) {
      var columns = [];

      _react["default"].Children.forEach(children, function (child) {
        if (_react["default"].isValidElement(child) && child.type === _Columns["default"]) {
          _react["default"].Children.forEach(child.props.children, function (col) {
            if (_react["default"].isValidElement(col)) {
              columns.push(col);
            }
          });
        }
      });

      this._columns = columns;
    }
  }, {
    key: "buildRows",
    value: function buildRows(_ref) {
      var _this2 = this;

      var grid = _ref.grid,
          isLoading = _ref.isLoading,
          data = _ref.data,
          props = _objectWithoutProperties(_ref, ["grid", "isLoading", "data"]);

      return isLoading ? _react["default"].createElement(_FullRow["default"], {
        colSpan: this._columns.length
      }, _react["default"].createElement(_reactLoading["default"], null)) : data && data.length > 0 ? data.map(function (rowData, i) {
        return _react["default"].createElement(_Row["default"], _extends({
          rowData: rowData,
          key: i,
          rowId: i,
          grid: grid
        }, props), _this2._columns);
      }) : _react["default"].createElement(_FullRow["default"], {
        colSpan: this._columns.length
      }, "Keine Ergebnisse vorhanden");
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          grid = _this$props.grid,
          pagination = _this$props.pagination,
          handleSort = _this$props.handleSort,
          activeSort = _this$props.activeSort,
          actions = _this$props.actions,
          pageSizes = _this$props.pageSizes,
          paginationAfterGrid = _this$props.paginationAfterGrid,
          paginationCountFormat = _this$props.paginationCountFormat,
          boxHeader = _this$props.boxHeader;
      var hasPagination = pagination && grid;

      var header = _react["default"].createElement(_Header["default"], {
        grid: grid,
        columns: this._columns,
        handleSort: handleSort,
        activeSort: activeSort
      });

      var tableClassName = this.props.tableClassName || "table table-striped table-hover table-bordered table-condensed";
      var boxClassName = this.props.boxClassName || "box";
      return _react["default"].createElement("div", {
        className: "grid-view"
      }, _react["default"].createElement("div", {
        className: boxClassName
      }, boxHeader || null, _react["default"].createElement("div", {
        className: "box-body"
      }, actions, hasPagination && paginationAfterGrid === false ? _react["default"].createElement(_Pagination["default"], _extends({
        grid: grid,
        pageSizes: pageSizes,
        paginationCountFormat: paginationCountFormat
      }, pagination)) : null, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-md-12"
      }, _react["default"].createElement("div", {
        className: "table-grid"
      }, _react["default"].createElement("div", {
        className: "table-responsive"
      }, _react["default"].createElement("table", {
        className: tableClassName
      }, _react["default"].createElement("thead", null, header), _react["default"].createElement("tbody", null, this._rows)))))), hasPagination && paginationAfterGrid === true ? _react["default"].createElement(_Pagination["default"], _extends({
        grid: grid,
        pageSizes: pageSizes,
        paginationCountFormat: paginationCountFormat
      }, pagination)) : null)));
    }
  }]);

  return GridComponent;
}(_react["default"].Component);

var _default = GridComponent;
exports["default"] = _default;