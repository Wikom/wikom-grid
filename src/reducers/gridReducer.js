/**
 * Created by rouven on 21.03.17.
 */

import {LOCATION_CHANGE} from 'react-router-redux'
import {actionTypes as formActions} from 'redux-form'
import queryString from 'query-string'

import * as types from '../actions/actionTypes'
import * as fieldStatus from '../constants/fieldStatus'

const initialGridState = () => ({
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
});

const defaultFilter = {};

const hasFieldWithStatus = (fieldStatus, status) => {
    for (let key in fieldStatus) {
        if (fieldStatus.hasOwnProperty(key) && fieldStatus[key] == status) {
            return true;
        }
    }

    return false;
};

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

        case types.SETNEXTEDITROW: {
            const gridState = Object.assign({}, state);

            if (!gridState[action.name]) {
                gridState[action.name] = initialGridState();
            }

            // if no row in edit or no field in edit -> directly set new row
            if (gridState[action.name].edit.current.row === null ||
                (!hasFieldWithStatus(gridState[action.name].edit.status, fieldStatus.STATUS_CHANGED) && !hasFieldWithStatus(gridState[action.name].edit.status, fieldStatus.STATUS_INSUBMISSION)
                )) {
                gridState[action.name].edit.current.row = action.index;
                gridState[action.name].edit.next.row = null;
                gridState[action.name].edit.status = {}

            } else {
                gridState[action.name].edit.next.row = action.index;
            }

            return gridState;
        }
        case types.FIELDSAVED: {
            const gridState = Object.assign({}, state);

            if (!gridState[action.name]) {
                gridState[action.name] = initialGridState();
            }

            gridState[action.name].edit.status[action.idx] = fieldStatus.STATUS_SAVED;

            // if edit row is queued and no field in edit: change row.
            if (gridState[action.name].edit.next.row !== null &&
                (!hasFieldWithStatus(gridState[action.name].edit.status, fieldStatus.STATUS_CHANGED) && !hasFieldWithStatus(gridState[action.name].edit.status, fieldStatus.STATUS_INSUBMISSION)
                )) {
                gridState[action.name].edit.current.row = gridState[action.name].edit.next.row;
                gridState[action.name].edit.next.row = null;
                gridState[action.name].edit.status = {}
            }

            return gridState;
        }
        case types.FIELDCHANGED: {
            const gridState = Object.assign({}, state);

            if (!gridState[action.name]) {
                gridState[action.name] = initialGridState();
            }

            gridState[action.name].edit.status[action.idx] = fieldStatus.STATUS_CHANGED;

            if (!hasFieldWithStatus(gridState[action.name].edit.status, fieldStatus.STATUS_INSUBMISSION) &&
                gridState[action.name].edit.next.row !== null) {
                gridState[action.name].edit.current.row = gridState[action.name].edit.next.row;
            }

            return gridState;
        }
        case types.FIELDINSUBMISSION: {
            const gridState = Object.assign({}, state);

            if (!gridState[action.name]) {
                gridState[action.name] = initialGridState();
            }

            gridState[action.name].edit.status[action.idx] = fieldStatus.STATUS_INSUBMISSION;

            return gridState;
        }
        case types.FIELDSUBMISSIONFAILED: {
            const gridState = Object.assign({}, state);

            if (!gridState[action.name]) {
                gridState[action.name] = initialGridState();
            }

            gridState[action.name].edit.status[action.idx] = fieldStatus.STATUS_ERROR;

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
        default:
            return state;
    }
};

export default gridReducer;