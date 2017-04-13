'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changeSelection = exports.changeData = exports.destroyGrid = exports.initializeGrid = exports.changeSort = exports.changePageSize = exports.changePage = exports.applyFilter = undefined;

var _reactRouterRedux = require('react-router-redux');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _actionTypes = require('./actionTypes');

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

        queryParams.grid = JSON.stringify(gridParams);

        return dispatch((0, _reactRouterRedux.push)({ pathname: url, search: _queryString2.default.stringify(queryParams) }));
    };
}; /**
    * Created by rouven on 17.03.17.
    */

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