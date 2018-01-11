/**
 * Created by rouven on 21.03.17.
 */

import {LOCATION_CHANGE} from 'react-router-redux'
import {actionTypes as formActions} from 'redux-form'
import queryString from 'query-string'

import * as types from '../actions/actionTypes'
import * as submitStatus from '../constants'

const initialGridState = () => ({
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
});

const defaultFilter = {};

const gridReducer = (state = {}, action) => {
    switch (action.type) {
        case formActions.INITIALIZE: {
            if (action.meta && action.meta.form && action.meta.form.indexOf('Filter') !== -1) {
                const gridState = Object.assign({}, state);
                const grid = action.meta.form.slice(0, action.meta.form.indexOf('Filter'));

                if (!gridState[grid]) {
                    gridState[grid] = initialGridState();
                }

                gridState[grid].filter = action.payload || {};

                return gridState;
            }

            return state;
        }
        case types.INITIALIZE: {
            const gridState = Object.assign({}, state);

            if (!gridState[action.name]) {
                gridState[action.name] = initialGridState();
            }

            return gridState;
        }

        case types.INITIALIZE_FILTER: {
            const gridState = Object.assign({}, state);

            defaultFilter[action.name] = action.initialValues || {};

            return gridState;
        }
        case types.DESTROY: {
            const gridState = Object.assign({}, state);

            if (gridState[action.name]) {
                delete gridState[action.name];
            }

            return gridState;
        }
        case LOCATION_CHANGE: {
            const gridState = Object.assign({}, state);
            const params = queryString.parse(action.payload.search);
            const gridParams = params.grid ? JSON.parse(params.grid) : {};

            for (let grid in gridState) {
                if (!gridParams.hasOwnProperty(grid)) {
                    gridState[grid] = initialGridState();
                    gridState[grid].filter = defaultFilter[grid] || {};
                }
            }

            for (let grid in gridParams) {
                const gridConfig = gridParams[grid];

                if (!gridState[grid]) {
                    gridState[grid] = initialGridState();
                }

                gridState[grid].data = [];
                gridState[grid].selection = [];
                gridState[grid].pagination.pageSize = gridConfig.pageSize || null;
                gridState[grid].pagination.currentPage = gridConfig.currentPage || 1;
                gridState[grid].sort = gridConfig.sort || null;
                gridState[grid].filter = gridConfig.filter || Object.assign({}, gridState[grid].filter);
            }

            return gridState;
        }
        case types.DATA_CHANGED: {
            const gridState = Object.assign({}, state);

            if (!gridState[action.name]) {
                gridState[action.name] = initialGridState();
            }

            gridState[action.name].data = action.data;

            return gridState;
        }
        case types.SELECTION_CHANGED: {
            const gridState = Object.assign({}, state);

            if (!gridState[action.name]) {
                gridState[action.name] = initialGridState();
            }

            let value = [].concat(JSON.parse(action.value));

            const availableIds = gridState[action.name].data.map(row => row.id);
            value = value.filter(v => availableIds.indexOf(v) !== -1);

            if (action.checked) {
                gridState[action.name].selection = gridState[action.name].selection
                    .concat(value)
                    .filter((v, i, a) => a.indexOf(v) === i);
            } else {
                gridState[action.name].selection = gridState[action.name].selection
                    .filter((v, i, a) => value.indexOf(v) === -1);
            }

            return gridState;
        }

        case types.EDIT_START: {
            const gridState = {...state};

            gridState[action.name].edit.rowId = action.rowId;
            gridState[action.name].edit.colId = action.colId;

            return gridState;
        }

        case formActions.START_SUBMIT:
        case formActions.SET_SUBMIT_SUCCEEDED:
        case formActions.SET_SUBMIT_FAILED:
        case formActions.CHANGE: {
            const gridState = {...state};

            const formName = action.meta && action.meta.form;
            const nameParts = formName.split('_');

            if (nameParts[0] === 'gridedit') {
                const name = nameParts[1];
                const rowId = nameParts[2];
                const colId = nameParts[3];

                if (!gridState[name].edit.status[rowId]) {
                    gridState[name].edit.status[rowId] = {};
                }

                let status = gridState[name].edit.status[rowId][colId];

                switch (action.type) {
                    case formActions.START_SUBMIT:
                        status = submitStatus.SUBMIT_STATUS_PENDING;
                        break;
                    case formActions.SET_SUBMIT_SUCCEEDED:
                        status = submitStatus.SUBMIT_STATUS_SUCCESS;
                        if (!gridState[name].edit.values[rowId]) {
                            gridState[name].edit.values[rowId] = {};
                        }
                        gridState[name].edit.values[rowId][colId] = gridState[name].edit.tmp
                            && gridState[name].edit.tmp[rowId]
                            && gridState[name].edit.tmp[rowId][colId];
                        break;
                    case formActions.SET_SUBMIT_FAILED:
                        status = submitStatus.SUBMIT_STATUS_FAILURE;
                        break;
                    case formActions.CHANGE:
                        if (!gridState[name].edit.tmp[rowId]) {
                            gridState[name].edit.tmp[rowId] = {};
                        }
                        gridState[name].edit.tmp[rowId][colId] = action.payload;
                        break;
                }

                gridState[name].edit.status[rowId][colId] = status;

                return gridState;
            }

            return state;
        }

        default:
            return state;
    }
};

export default gridReducer;