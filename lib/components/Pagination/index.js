"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PAGINATION_COUNT_FORMAT_FULL = exports.PAGINATION_COUNT_FORMAT_SHORT = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactPager = _interopRequireDefault(require("react-pager"));

var _pagination = _interopRequireDefault(require("../propTypes/pagination"));

var _index = require("../../actions/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PAGINATION_COUNT_FORMAT_SHORT = function PAGINATION_COUNT_FORMAT_SHORT(_ref) {
  var totalCount = _ref.totalCount;
  return totalCount + ' Zeile(n)';
};

exports.PAGINATION_COUNT_FORMAT_SHORT = PAGINATION_COUNT_FORMAT_SHORT;

var PAGINATION_COUNT_FORMAT_FULL = function PAGINATION_COUNT_FORMAT_FULL(_ref2) {
  var currentPage = _ref2.currentPage,
      pageCount = _ref2.pageCount,
      perPage = _ref2.perPage,
      totalCount = _ref2.totalCount;
  var valueFrom = (currentPage - 1) * perPage + 1;
  var valueTo = currentPage * perPage;
  return valueFrom + ' bis ' + (valueTo < totalCount ? valueTo : totalCount) + ' von ' + totalCount + ' Einträgen';
};

exports.PAGINATION_COUNT_FORMAT_FULL = PAGINATION_COUNT_FORMAT_FULL;

var renderPageSizeOptions = function renderPageSizeOptions(pageSizes, perPage) {
  if (pageSizes.indexOf(perPage) === -1) {
    pageSizes.push(perPage);
    pageSizes.sort(function (a, b) {
      return a - b;
    });
  }

  return pageSizes.map(function (value, i) {
    return _react["default"].createElement("option", _extends({}, value, {
      key: 'psso_' + i
    }), value);
  });
};

var Pagination = function Pagination(_ref3) {
  var grid = _ref3.grid,
      currentPage = _ref3.currentPage,
      pageCount = _ref3.pageCount,
      perPage = _ref3.perPage,
      totalCount = _ref3.totalCount,
      handlePageChanged = _ref3.handlePageChanged,
      handlePageSizeChanged = _ref3.handlePageSizeChanged,
      pageSizes = _ref3.pageSizes,
      paginationCountFormat = _ref3.paginationCountFormat;
  return _react["default"].createElement("div", {
    className: "row grid-before-table"
  }, _react["default"].createElement("div", {
    className: "col-md-3"
  }, _react["default"].createElement("div", {
    className: "grid-filter grid-filter--entries"
  }, paginationCountFormat({
    currentPage: currentPage,
    pageCount: pageCount,
    perPage: perPage,
    totalCount: totalCount
  }))), _react["default"].createElement("div", {
    className: "col-md-6"
  }, _react["default"].createElement("div", {
    className: "text-center"
  }, _react["default"].createElement(_reactPager["default"], {
    total: pageCount,
    current: currentPage - 1,
    titles: {
      first: 'Erste Seite',
      prev: "\xAB",
      prevSet: '...',
      nextSet: '...',
      next: "\xBB",
      last: 'Letzte Seite'
    },
    visiblePages: 5,
    onPageChanged: function onPageChanged(nextPage) {
      return handlePageChanged(nextPage, grid);
    }
  }))), _react["default"].createElement("div", {
    className: "col-md-3 text-right"
  }, _react["default"].createElement("div", {
    className: "grid-filter grid-filter--entries-per-page"
  }, _react["default"].createElement("div", {
    className: "form-inline"
  }, _react["default"].createElement("label", {
    htmlFor: "pagesizeSelect"
  }, "Eintr\xE4ge pro Seite:"), _react["default"].createElement("select", {
    value: perPage,
    name: "pagesizeSelect",
    className: "input-sm form-control",
    onChange: function onChange(evt) {
      return handlePageSizeChanged(evt, grid);
    }
  }, renderPageSizeOptions(pageSizes, perPage))))));
};

Pagination.defaultProps = {
  pageCount: 0,
  paginationCountFormat: PAGINATION_COUNT_FORMAT_SHORT
};
Pagination.propTypes = Object.assign({
  grid: _propTypes["default"].string.isRequired,
  pageSizes: _propTypes["default"].arrayOf(_propTypes["default"].number).isRequired,
  paginationCountFormat: _propTypes["default"].func
}, _pagination["default"]);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    handlePageSizeChanged: function handlePageSizeChanged(evt, grid) {
      return dispatch((0, _index.changePageSize)(evt, grid));
    },
    handlePageChanged: function handlePageChanged(nextPage, grid) {
      return dispatch((0, _index.changePage)(nextPage, grid));
    }
  };
};

var _default = (0, _reactRedux.connect)(null, mapDispatchToProps)(Pagination);

exports["default"] = _default;