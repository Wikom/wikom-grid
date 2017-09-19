'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRouterRedux = require('react-router-redux');

var _reduxForm = require('redux-form');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _actionTypes = require('../actions/actionTypes');

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by rouven on 21.03.17.
 */

var initialGridState = function initialGridState() {
    return {
        data: [],
        filter: {},
        pagination: {},
        selection: [],
        sort: null,
        edit: {
            grid: null,
            row: null,
            cell: null
        }
    };
};

var defaultFilter = {};

var gridReducer = function gridReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _reduxForm.actionTypes.INITIALIZE:
            {
                if (action.meta && action.meta.form && action.meta.form.indexOf('Filter') !== -1) {
                    var gridState = Object.assign({}, state);
                    var grid = action.meta.form.slice(0, action.meta.form.indexOf('Filter'));

                    if (!gridState[grid]) {
                        gridState[grid] = initialGridState();
                    }

                    gridState[grid].filter = action.payload || {};

                    return gridState;
                }

                return state;
            }
        case types.INITIALIZE:
            {
                var _gridState = Object.assign({}, state);

                if (!_gridState[action.name]) {
                    _gridState[action.name] = initialGridState();
                }

                return _gridState;
            }
        case types.INITIALIZE_FILTER:
            {
                var _gridState2 = Object.assign({}, state);

                defaultFilter[action.name] = action.initialValues || {};

                return _gridState2;
            }
        case types.DESTROY:
            {
                var _gridState3 = Object.assign({}, state);

                if (_gridState3[action.name]) {
                    delete _gridState3[action.name];
                }

                return _gridState3;
            }
        case _reactRouterRedux.LOCATION_CHANGE:
            {
                // console.log('---LOCATION CHANGE---');
                // console.log(action);

                var _gridState4 = Object.assign({}, state);
                var params = _queryString2.default.parse(action.payload.search);
                var gridParams = params.grid ? JSON.parse(params.grid) : {};

                for (var _grid in _gridState4) {
                    if (!gridParams.hasOwnProperty(_grid)) {
                        console.log(defaultFilter);
                        _gridState4[_grid] = initialGridState();
                        _gridState4[_grid].filter = defaultFilter[_grid] || {};
                    }
                }

                for (var _grid2 in gridParams) {
                    var gridConfig = gridParams[_grid2];

                    if (!_gridState4[_grid2]) {
                        _gridState4[_grid2] = initialGridState();
                    }

                    _gridState4[_grid2].data = [];
                    _gridState4[_grid2].selection = [];
                    _gridState4[_grid2].pagination.pageSize = gridConfig.pageSize || null;
                    _gridState4[_grid2].pagination.currentPage = gridConfig.currentPage || 1;
                    _gridState4[_grid2].sort = gridConfig.sort || null;
                    _gridState4[_grid2].filter = gridConfig.filter || Object.assign({}, _gridState4[_grid2].filter);
                }

                return _gridState4;
            }
        case types.DATA_CHANGED:
            {
                var _gridState5 = Object.assign({}, state);

                if (!_gridState5[action.name]) {
                    _gridState5[action.name] = initialGridState();
                }

                _gridState5[action.name].data = action.data;

                return _gridState5;
            }
        case types.SELECTION_CHANGED:
            {
                var _gridState6 = Object.assign({}, state);

                if (!_gridState6[action.name]) {
                    _gridState6[action.name] = initialGridState();
                }

                var value = [].concat(JSON.parse(action.value));

                var availableIds = _gridState6[action.name].data.map(function (row) {
                    return row.id;
                });
                value = value.filter(function (v) {
                    return availableIds.indexOf(v) !== -1;
                });

                if (action.checked) {
                    _gridState6[action.name].selection = _gridState6[action.name].selection.concat(value).filter(function (v, i, a) {
                        return a.indexOf(v) === i;
                    });
                } else {
                    _gridState6[action.name].selection = _gridState6[action.name].selection.filter(function (v, i, a) {
                        return value.indexOf(v) === -1;
                    });
                }

                return _gridState6;
            }
        default:
            return state;
    }
};

exports.default = gridReducer;