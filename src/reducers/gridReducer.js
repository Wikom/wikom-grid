/**
 * Created by rouven on 21.03.17.
 */

import {LOCATION_CHANGE} from 'react-router-redux'
import {actionTypes as formActions} from 'redux-form'
import queryString from 'query-string'

import * as types from '../actions/actionTypes'

const initialGridState = () => ({
    data: [],
    filter: {},
    pagination: {},
    selection: [],
    sort: null,
    edit: {
        row: null,
        cell: null
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
        case types.SETEDITROW: {
            const gridState = Object.assign({}, state);

            if (!gridState[action.name]) {
                gridState[action.name] = initialGridState();
            }

            gridState[action.name].edit.row = action.index;

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
            // console.log('---LOCATION CHANGE---');
            // console.log(action);

            const gridState = Object.assign({}, state);
            const params = queryString.parse(action.payload.search);
            const gridParams = params.grid ? JSON.parse(params.grid) : {};

            for (let grid in gridState) {
                if (!gridParams.hasOwnProperty(grid)) {
                    console.log(defaultFilter);
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