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

var _fieldStatus = require('../constants/fieldStatus');

var fieldStatus = _interopRequireWildcard(_fieldStatus);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialGridState = function initialGridState() {
    return {
        data: [],
        filter: {},
        pagination: {},
        selection: [],
        sort: null,
        edit: {
            current: {
                row: null,
                cell: null
            },
            next: {
                row: null,
                cell: null
            },
            status: {}
        }
    };
}; /**
    * Created by rouven on 21.03.17.
    */

var defaultFilter = {};

var hasFieldWithStatus = function hasFieldWithStatus(fieldStatus, status) {
    for (var key in fieldStatus) {
        if (fieldStatus.hasOwnProperty(key) && fieldStatus[key] == status) {
            return true;
        }
    }

    return false;
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

        case types.SETNEXTEDITROW:
            {
                var _gridState2 = Object.assign({}, state);

                if (!_gridState2[action.name]) {
                    _gridState2[action.name] = initialGridState();
                }

                // if no row in edit or no field in edit -> directly set new row
                if (_gridState2[action.name].edit.current.row === null || !hasFieldWithStatus(_gridState2[action.name].edit.status, fieldStatus.STATUS_CHANGED) && !hasFieldWithStatus(_gridState2[action.name].edit.status, fieldStatus.STATUS_INSUBMISSION)) {
                    _gridState2[action.name].edit.current.row = action.index;
                    _gridState2[action.name].edit.next.row = null;
                    _gridState2[action.name].edit.status = {};
                } else {
                    _gridState2[action.name].edit.next.row = action.index;
                }

                return _gridState2;
            }
        case types.FIELDSAVED:
            {
                var _gridState3 = Object.assign({}, state);

                if (!_gridState3[action.name]) {
                    _gridState3[action.name] = initialGridState();
                }

                _gridState3[action.name].edit.status[action.idx] = fieldStatus.STATUS_SAVED;

                // if edit row is queued and no field in edit: change row.
                if (_gridState3[action.name].edit.next.row !== null && !hasFieldWithStatus(_gridState3[action.name].edit.status, fieldStatus.STATUS_CHANGED) && !hasFieldWithStatus(_gridState3[action.name].edit.status, fieldStatus.STATUS_INSUBMISSION)) {
                    _gridState3[action.name].edit.current.row = _gridState3[action.name].edit.next.row;
                    _gridState3[action.name].edit.next.row = null;
                    _gridState3[action.name].edit.status = {};
                }

                return _gridState3;
            }
        case types.FIELDCHANGED:
            {
                var _gridState4 = Object.assign({}, state);

                if (!_gridState4[action.name]) {
                    _gridState4[action.name] = initialGridState();
                }

                _gridState4[action.name].edit.status[action.idx] = fieldStatus.STATUS_CHANGED;

                if (!hasFieldWithStatus(_gridState4[action.name].edit.status, fieldStatus.STATUS_INSUBMISSION) && _gridState4[action.name].edit.next.row !== null) {
                    _gridState4[action.name].edit.current.row = _gridState4[action.name].edit.next.row;
                }

                return _gridState4;
            }
        case types.FIELDINSUBMISSION:
            {
                var _gridState5 = Object.assign({}, state);

                if (!_gridState5[action.name]) {
                    _gridState5[action.name] = initialGridState();
                }

                _gridState5[action.name].edit.status[action.idx] = fieldStatus.STATUS_INSUBMISSION;

                return _gridState5;
            }
        case types.FIELDSUBMISSIONFAILED:
            {
                var _gridState6 = Object.assign({}, state);

                if (!_gridState6[action.name]) {
                    _gridState6[action.name] = initialGridState();
                }

                _gridState6[action.name].edit.status[action.idx] = fieldStatus.STATUS_ERROR;

                return _gridState6;
            }

        case types.INITIALIZE_FILTER:
            {
                var _gridState7 = Object.assign({}, state);

                defaultFilter[action.name] = action.initialValues || {};

                return _gridState7;
            }
        case types.DESTROY:
            {
                var _gridState8 = Object.assign({}, state);

                if (_gridState8[action.name]) {
                    delete _gridState8[action.name];
                }

                return _gridState8;
            }
        case _reactRouterRedux.LOCATION_CHANGE:
            {
                var _gridState9 = Object.assign({}, state);
                var params = _queryString2.default.parse(action.payload.search);
                var gridParams = params.grid ? JSON.parse(params.grid) : {};

                for (var _grid in _gridState9) {
                    if (!gridParams.hasOwnProperty(_grid)) {
                        _gridState9[_grid] = initialGridState();
                        _gridState9[_grid].filter = defaultFilter[_grid] || {};
                    }
                }

                for (var _grid2 in gridParams) {
                    var gridConfig = gridParams[_grid2];

                    if (!_gridState9[_grid2]) {
                        _gridState9[_grid2] = initialGridState();
                    }

                    _gridState9[_grid2].data = [];
                    _gridState9[_grid2].selection = [];
                    _gridState9[_grid2].pagination.pageSize = gridConfig.pageSize || null;
                    _gridState9[_grid2].pagination.currentPage = gridConfig.currentPage || 1;
                    _gridState9[_grid2].sort = gridConfig.sort || null;
                    _gridState9[_grid2].filter = gridConfig.filter || Object.assign({}, _gridState9[_grid2].filter);
                }

                return _gridState9;
            }
        case types.DATA_CHANGED:
            {
                var _gridState10 = Object.assign({}, state);

                if (!_gridState10[action.name]) {
                    _gridState10[action.name] = initialGridState();
                }

                _gridState10[action.name].data = action.data;

                return _gridState10;
            }
        case types.SELECTION_CHANGED:
            {
                var _gridState11 = Object.assign({}, state);

                if (!_gridState11[action.name]) {
                    _gridState11[action.name] = initialGridState();
                }

                var value = [].concat(JSON.parse(action.value));

                var availableIds = _gridState11[action.name].data.map(function (row) {
                    return row.id;
                });
                value = value.filter(function (v) {
                    return availableIds.indexOf(v) !== -1;
                });

                if (action.checked) {
                    _gridState11[action.name].selection = _gridState11[action.name].selection.concat(value).filter(function (v, i, a) {
                        return a.indexOf(v) === i;
                    });
                } else {
                    _gridState11[action.name].selection = _gridState11[action.name].selection.filter(function (v, i, a) {
                        return value.indexOf(v) === -1;
                    });
                }

                return _gridState11;
            }
        default:
            return state;
    }
};

exports.default = gridReducer;