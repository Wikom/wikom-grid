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
        sort: null
    };
};

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
        case types.DESTROY:
            {
                var _gridState2 = Object.assign({}, state);

                if (_gridState2[action.name]) {
                    delete _gridState2[action.name];
                }

                return _gridState2;
            }
        case _reactRouterRedux.LOCATION_CHANGE:
            {
                // console.log('---LOCATION CHANGE---');
                // console.log(action);

                var _gridState3 = Object.assign({}, state);
                var params = _queryString2.default.parse(action.payload.search);
                var gridParams = params.grid ? JSON.parse(params.grid) : {};

                for (var _grid in gridParams) {
                    var gridConfig = gridParams[_grid];

                    if (!_gridState3[_grid]) {
                        _gridState3[_grid] = initialGridState();
                    }

                    _gridState3[_grid].data = [];
                    _gridState3[_grid].selection = [];
                    _gridState3[_grid].pagination.pageSize = gridConfig.pageSize || null;
                    _gridState3[_grid].pagination.currentPage = gridConfig.currentPage || 1;
                    _gridState3[_grid].sort = gridConfig.sort || null;
                    _gridState3[_grid].filter = gridConfig.filter || {};
                }

                return _gridState3;
            }
        case types.DATA_CHANGED:
            {
                var _gridState4 = Object.assign({}, state);

                if (!_gridState4[action.name]) {
                    _gridState4[action.name] = initialGridState();
                }

                _gridState4[action.name].data = action.data;

                return _gridState4;
            }
        case types.SELECTION_CHANGED:
            {
                var _gridState5 = Object.assign({}, state);

                if (!_gridState5[action.name]) {
                    _gridState5[action.name] = initialGridState();
                }

                var value = [].concat(JSON.parse(action.value));

                var availableIds = _gridState5[action.name].data.map(function (row) {
                    return row.id;
                });
                value = value.filter(function (v) {
                    return availableIds.indexOf(v) !== -1;
                });

                if (action.checked) {
                    _gridState5[action.name].selection = _gridState5[action.name].selection.concat(value).filter(function (v, i, a) {
                        return a.indexOf(v) === i;
                    });
                } else {
                    _gridState5[action.name].selection = _gridState5[action.name].selection.filter(function (v, i, a) {
                        return value.indexOf(v) === -1;
                    });
                }

                return _gridState5;
            }
        default:
            return state;
    }
};

exports.default = gridReducer;