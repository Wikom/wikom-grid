/**
 * Created by rouven on 17.03.17.
 */

import {push} from 'react-router-redux'
import queryString from 'query-string'
import * as types from './actionTypes'

const changeGridParam = ({name, param, value}) => (dispatch, getState) => {
    const location = getState().routing.location;
    const url = location.pathname;
    const queryParams = queryString.parse(location.search);
    const gridParams = queryParams.grid ? JSON.parse(queryParams.grid) : {};

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

    return dispatch(push({pathname: url, search: queryString.stringify(queryParams)}))
};

export const applyFilter = (data, name) => changeGridParam({name, param: 'filter', value: data});

export const changePage = (nextPage, name) => changeGridParam({name, param: 'currentPage', value: nextPage + 1});

export const changePageSize = (evt, name) => changeGridParam({name, param: 'pageSize', value: Number(evt.target.value)});

export const changeSort = (name, idx, asc = true) => changeGridParam({name, param: 'sort', value: (asc ? '' : '-') + idx});

export const initializeGrid = (name) => ({
    type: types.INITIALIZE,
    name
});

export const destroyGrid = (name) => ({
    type: types.DESTROY,
    name
});

export const changeData = (name, data) => ({
    type: types.DATA_CHANGED,
    name,
    data
});

export const changeSelection = (name, target) => ({
    type: types.SELECTION_CHANGED,
    name,
    checked: target.checked,
    value: target.value
});

export const initializeFilter = (name, initialValues) => ({
    type: types.INITIALIZE_FILTER,
    name,
    initialValues
});

export const destroyFilter = (name) => ({
    type: types.DESTROY_FILTER,
    name
});
