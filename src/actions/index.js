/**
 * Created by rouven on 17.03.17.
 */

import {replace} from 'react-router-redux'
import queryString from 'query-string'
import * as types from './actionTypes'
import {submit} from 'wikom-data';

const changeGridParam = ({name, param, value}) => (dispatch, getState) => {
    const location = getState().routing.location;
    const url = location.pathname;
    const queryParams = queryString.parse(location.search);
    const gridParams = queryParams.grid ? JSON.parse(queryParams.grid) : {};

    if (!gridParams[name]) {
        gridParams[name] = {};
    }

    if (param === 'filter') {
        const visibleFields = getState().form[name + 'Filter'].registeredFields || {};

        value = Object.assign({},
            ...Object.keys(value)
                .filter(key => visibleFields.hasOwnProperty(key))
                .map(key => ({[key]: value[key]}))
        );
    }

    if (value === null || (typeof value === 'object' && Object.keys(value).length === 0)) {
        delete gridParams[name][param];
    } else {
        gridParams[name][param] = value;
    }

    if (Object.keys(gridParams[name]).length === 0) {
        delete gridParams[name];
    }

    if (Object.keys(gridParams).length === 0) {
        delete queryParams.grid;
    } else {
        queryParams.grid = JSON.stringify(gridParams);
    }

    return dispatch(replace({pathname: url, search: queryString.stringify(queryParams)}))
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

export const clearSelection = name => ({
    type: types.SELECTION_CLEARED,
    name
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

export const editStart = (name, rowId, colId) => ({
    type: types.EDIT_START,
    name,
    rowId,
    colId
});

export const editEnd = (name, rowId, colId) => (dispatch, getState) => {
    const gridState = getState().grid[name].edit;
    const editEndFn = () => {
        if (rowId === gridState.rowId && colId === gridState.colId) {
            dispatch(editStart(name, null, null));
        }
    };

    setTimeout(editEndFn, 100);
};

export const handleSubmit = (values, grid, rowData, editRoute) => (dispatch, getState) => {
    const allForms = getState().form;
    const editFormValues = Object.keys(allForms)
        .filter(formName => formName.indexOf('gridedit_' + grid) === 0)
        .map(formName => allForms[formName].values)
        .reduce((acc, cur) => ({...acc, ...cur}), {});
    const data = {...rowData, ...editFormValues, ...values};

    return dispatch(submit({url: editRoute, data}));
};
