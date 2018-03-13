'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by rouven on 21.03.17.
                                                                                                                                                                                                                                                                   */

var _reactRouterRedux = require('react-router-redux');

var _reduxForm = require('redux-form');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _actionTypes = require('../actions/actionTypes');

var types = _interopRequireWildcard(_actionTypes);

var _constants = require('../constants');

var submitStatus = _interopRequireWildcard(_constants);

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
            rowId: null,
            colId: null,
            status: {},
            values: {},
            tmp: {}
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
                var _gridState4 = Object.assign({}, state);
                var params = _queryString2.default.parse(action.payload.search);
                var gridParams = params.grid ? JSON.parse(params.grid) : {};

                for (var _grid in _gridState4) {
                    if (!gridParams.hasOwnProperty(_grid)) {
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

        case types.SELECTION_CLEARED:
            {
                var _gridState7 = Object.assign({}, state);

                if (!_gridState7[action.name]) {
                    _gridState7[action.name] = initialGridState();
                }

                _gridState7[action.name].selection = [];

                return _gridState7;
            }

        case types.EDIT_START:
            {
                var _gridState8 = _extends({}, state);

                _gridState8[action.name].edit.rowId = action.rowId;
                _gridState8[action.name].edit.colId = action.colId;

                return _gridState8;
            }

        case _reduxForm.actionTypes.START_SUBMIT:
        case _reduxForm.actionTypes.SET_SUBMIT_SUCCEEDED:
        case _reduxForm.actionTypes.SET_SUBMIT_FAILED:
        case _reduxForm.actionTypes.CHANGE:
            {
                var _gridState9 = _extends({}, state);

                var formName = action.meta && action.meta.form;
                var nameParts = formName.split('_');

                if (nameParts[0] === 'gridedit') {
                    var name = nameParts[1];
                    var rowId = nameParts[2];
                    var colId = nameParts[3];

                    if (!_gridState9[name].edit.status[rowId]) {
                        _gridState9[name].edit.status[rowId] = {};
                    }

                    var status = _gridState9[name].edit.status[rowId][colId];

                    switch (action.type) {
                        case _reduxForm.actionTypes.START_SUBMIT:
                            status = submitStatus.SUBMIT_STATUS_PENDING;
                            break;
                        case _reduxForm.actionTypes.SET_SUBMIT_SUCCEEDED:
                            status = submitStatus.SUBMIT_STATUS_SUCCESS;
                            if (!_gridState9[name].edit.values[rowId]) {
                                _gridState9[name].edit.values[rowId] = {};
                            }
                            _gridState9[name].edit.values[rowId][colId] = _gridState9[name].edit.tmp && _gridState9[name].edit.tmp[rowId] && _gridState9[name].edit.tmp[rowId][colId];
                            break;
                        case _reduxForm.actionTypes.SET_SUBMIT_FAILED:
                            status = submitStatus.SUBMIT_STATUS_FAILURE;
                            break;
                        case _reduxForm.actionTypes.CHANGE:
                            if (!_gridState9[name].edit.tmp[rowId]) {
                                _gridState9[name].edit.tmp[rowId] = {};
                            }
                            _gridState9[name].edit.tmp[rowId][colId] = action.payload;
                            break;
                    }

                    _gridState9[name].edit.status[rowId][colId] = status;

                    return _gridState9;
                }

                return state;
            }

        default:
            return state;
    }
};

exports.default = gridReducer;