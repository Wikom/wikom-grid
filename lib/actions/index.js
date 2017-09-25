'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.submitField = exports.destroyFilter = exports.initializeFilter = exports.changeSelection = exports.changeData = exports.destroyGrid = exports.setEditRow = exports.initializeGrid = exports.changeSort = exports.changePageSize = exports.changePage = exports.applyFilter = undefined;

var _reactRouterRedux = require('react-router-redux');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _actionTypes = require('./actionTypes');

var types = _interopRequireWildcard(_actionTypes);

var _reduxForm = require('redux-form');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
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

        if (value !== null) {
            gridParams[name][param] = value;
        } else {
            delete gridParams[name][param];
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

var setEditRow = exports.setEditRow = function setEditRow(name, index) {
    return {
        type: types.SETEDITROW,
        name: name,
        index: index
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

var submitField = function submitField(_ref2) {
    var rowData = _ref2.rowData,
        idx = _ref2.idx,
        url = _ref2.url,
        value = _ref2.value,
        rest = _objectWithoutProperties(_ref2, ['rowData', 'idx', 'url', 'value']);

    console.log('submitField', rowData, value, idx, url, rest);
    var data = rowData;
    data[idx] = value;

    return (0, _reduxForm.submit)({ url: url, data: data });
};
exports.submitField = submitField;