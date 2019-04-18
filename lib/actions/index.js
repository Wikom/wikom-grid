"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleSubmit = exports.editEnd = exports.editStart = exports.destroyFilter = exports.initializeFilter = exports.clearSelection = exports.changeSelection = exports.changeData = exports.destroyGrid = exports.initializeGrid = exports.changeSort = exports.changePageSize = exports.changePage = exports.applyFilter = void 0;

var _reactRouterRedux = require("react-router-redux");

var _queryString = _interopRequireDefault(require("query-string"));

var types = _interopRequireWildcard(require("./actionTypes"));

var _wikomData = require("wikom-data");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var changeGridParam = function changeGridParam(_ref) {
  var name = _ref.name,
      param = _ref.param,
      value = _ref.value;
  return function (dispatch, getState) {
    var location = getState().routing.location;
    var url = location.pathname;

    var queryParams = _queryString["default"].parse(location.search);

    var gridParams = queryParams.grid ? JSON.parse(queryParams.grid) : {};

    if (!gridParams[name]) {
      gridParams[name] = {};
    }

    if (param === 'filter') {
      var visibleFields = getState().form[name + 'Filter'].registeredFields || {};
      value = Object.assign.apply(Object, [{}].concat(_toConsumableArray(Object.keys(value).filter(function (key) {
        return visibleFields.hasOwnProperty(key);
      }).map(function (key) {
        return _defineProperty({}, key, value[key]);
      }))));
    }

    if (value === null || _typeof(value) === 'object' && Object.keys(value).length === 0) {
      delete gridParams[name][param];
    } else {
      gridParams[name][param] = value;
    }

    if (Object.keys(gridParams[name]).length === 0) {
      delete gridParams[name];
    }

    if (Object.keys(gridParams).length === 0) {
      delete queryParams.grid;
    } else {
      queryParams.grid = JSON.stringify(gridParams);
    }

    return dispatch((0, _reactRouterRedux.replace)({
      pathname: url,
      search: _queryString["default"].stringify(queryParams)
    }));
  };
};

var applyFilter = function applyFilter(data, name) {
  return changeGridParam({
    name: name,
    param: 'filter',
    value: data
  });
};

exports.applyFilter = applyFilter;

var changePage = function changePage(nextPage, name) {
  return changeGridParam({
    name: name,
    param: 'currentPage',
    value: nextPage + 1
  });
};

exports.changePage = changePage;

var changePageSize = function changePageSize(evt, name) {
  return changeGridParam({
    name: name,
    param: 'pageSize',
    value: Number(evt.target.value)
  });
};

exports.changePageSize = changePageSize;

var changeSort = function changeSort(name, idx) {
  var asc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return changeGridParam({
    name: name,
    param: 'sort',
    value: (asc ? '' : '-') + idx
  });
};

exports.changeSort = changeSort;

var initializeGrid = function initializeGrid(name) {
  return {
    type: types.INITIALIZE,
    name: name
  };
};

exports.initializeGrid = initializeGrid;

var destroyGrid = function destroyGrid(name) {
  return {
    type: types.DESTROY,
    name: name
  };
};

exports.destroyGrid = destroyGrid;

var changeData = function changeData(name, data) {
  return {
    type: types.DATA_CHANGED,
    name: name,
    data: data
  };
};

exports.changeData = changeData;

var changeSelection = function changeSelection(name, target) {
  return {
    type: types.SELECTION_CHANGED,
    name: name,
    checked: target.checked,
    value: target.value
  };
};

exports.changeSelection = changeSelection;

var clearSelection = function clearSelection(name) {
  return {
    type: types.SELECTION_CLEARED,
    name: name
  };
};

exports.clearSelection = clearSelection;

var initializeFilter = function initializeFilter(name, initialValues) {
  return {
    type: types.INITIALIZE_FILTER,
    name: name,
    initialValues: initialValues
  };
};

exports.initializeFilter = initializeFilter;

var destroyFilter = function destroyFilter(name) {
  return {
    type: types.DESTROY_FILTER,
    name: name
  };
};

exports.destroyFilter = destroyFilter;

var editStart = function editStart(name, rowId, colId) {
  return {
    type: types.EDIT_START,
    name: name,
    rowId: rowId,
    colId: colId
  };
};

exports.editStart = editStart;

var editEnd = function editEnd(name, rowId, colId) {
  return function (dispatch, getState) {
    var gridState = getState().grid[name].edit;

    var editEndFn = function editEndFn() {
      if (rowId === gridState.rowId && colId === gridState.colId) {
        dispatch(editStart(name, null, null));
      }
    };

    setTimeout(editEndFn, 100);
  };
};

exports.editEnd = editEnd;

var handleSubmit = function handleSubmit(values, grid, rowData, editRoute) {
  return function (dispatch, getState) {
    var allForms = getState().form;
    var editFormValues = Object.keys(allForms).filter(function (formName) {
      return formName.indexOf('gridedit_' + grid) === 0;
    }).map(function (formName) {
      return allForms[formName].values;
    }).reduce(function (acc, cur) {
      return _objectSpread({}, acc, cur);
    }, {});

    var data = _objectSpread({}, rowData, editFormValues, values);

    return dispatch((0, _wikomData.submit)({
      url: editRoute,
      data: data
    }));
  };
};

exports.handleSubmit = handleSubmit;