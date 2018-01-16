'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.editEnd = exports.editStart = exports.destroyFilter = exports.initializeFilter = exports.changeSelection = exports.changeData = exports.destroyGrid = exports.initializeGrid = exports.changeSort = exports.changePageSize = exports.changePage = exports.applyFilter = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _reactRouterRedux = require('react-router-redux');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _actionTypes = require('./actionTypes');

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * Created by rouven on 17.03.17.
                                                                                                                                                                                                     */

var changeGridParam = function changeGridParam(_ref) {
    var name = _ref.name,
        param = _ref.param,
        value = _ref.value;
    return function (dispatch, getState) {
        var location = getState().routing.location;
        var url = location.pathname;
        var queryParams = _queryString2.default.parse(location.search);
        var gridParams = queryParams.grid ? JSON.parse(queryParams.grid) : {};

        if (!gridParams[name]) {
            gridParams[name] = {};
        }

        if (param === 'filter') {
            var visibleFields = getState().form[name + 'Filter'].registeredFields;

            value = Object.assign.apply(Object, [{}].concat(_toConsumableArray(Object.keys(value).filter(function (key) {
                return visibleFields.hasOwnProperty(key);
            }).map(function (key) {
                return _defineProperty({}, key, value[key]);
            }))));
        }

        if (value === null || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && Object.keys(value).length === 0) {
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

        return dispatch((0, _reactRouterRedux.replace)({ pathname: url, search: _queryString2.default.stringify(queryParams) }));
    };
};

var applyFilter = exports.applyFilter = function applyFilter(data, name) {
    return changeGridParam({ name: name, param: 'filter', value: data });
};

var changePage = exports.changePage = function changePage(nextPage, name) {
    return changeGridParam({ name: name, param: 'currentPage', value: nextPage + 1 });
};

var changePageSize = exports.changePageSize = function changePageSize(evt, name) {
    return changeGridParam({ name: name, param: 'pageSize', value: Number(evt.target.value) });
};

var changeSort = exports.changeSort = function changeSort(name, idx) {
    var asc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    return changeGridParam({ name: name, param: 'sort', value: (asc ? '' : '-') + idx });
};

var initializeGrid = exports.initializeGrid = function initializeGrid(name) {
    return {
        type: types.INITIALIZE,
        name: name
    };
};

var destroyGrid = exports.destroyGrid = function destroyGrid(name) {
    return {
        type: types.DESTROY,
        name: name
    };
};

var changeData = exports.changeData = function changeData(name, data) {
    return {
        type: types.DATA_CHANGED,
        name: name,
        data: data
    };
};

var changeSelection = exports.changeSelection = function changeSelection(name, target) {
    return {
        type: types.SELECTION_CHANGED,
        name: name,
        checked: target.checked,
        value: target.value
    };
};

var initializeFilter = exports.initializeFilter = function initializeFilter(name, initialValues) {
    return {
        type: types.INITIALIZE_FILTER,
        name: name,
        initialValues: initialValues
    };
};

var destroyFilter = exports.destroyFilter = function destroyFilter(name) {
    return {
        type: types.DESTROY_FILTER,
        name: name
    };
};

var editStart = exports.editStart = function editStart(name, rowId, colId) {
    return {
        type: types.EDIT_START,
        name: name,
        rowId: rowId,
        colId: colId
    };
};

var editEnd = exports.editEnd = function editEnd(name, rowId, colId) {
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