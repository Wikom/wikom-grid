/**
 * Created by rouven on 22.03.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import queryString from 'query-string'
import DataProvider from 'wikom-data'
import {changeSort} from '../actions'

const ConnectedGrid = ({grid, url, force, children, ...rest}) =>
    <DataProvider name={grid} grid={grid} url={url} force={force} {...rest}>
        {children}
    </DataProvider>;

const mapStateToProps = (state, {grid, baseUrl}) => {
    let url = baseUrl;
    let activeSort = null;

    if (state.grid[grid]) {
        let append = {};

        if (state.grid[grid].filter) {
            for (let filter in state.grid[grid].filter) {
                append['filter[' + filter + ']'] = state.grid[grid].filter[filter];
            }
        }

        const pagination = state.grid[grid].pagination;
        if (pagination && pagination.pageSize) {
            append['per-page'] = pagination.pageSize;
        }
        if (pagination && pagination.currentPage) {
            append['page'] = pagination.currentPage;
        }

        if (state.grid[grid].sort) {
            activeSort = state.grid[grid].sort;
            append['sort'] = state.grid[grid].sort;
        }

        if (Object.keys(append).length > 0) {
            url += '?' + queryString.stringify(append);
        }
    }

    return {
        url,
        activeSort
    };
};

const mapDispatchToProps = (dispatch, {grid}) => ({
    handleSort: (idx, asc) => dispatch(changeSort(grid, idx, asc))
});

const ConnectedGridContainer = connect(mapStateToProps, mapDispatchToProps)(ConnectedGrid);

ConnectedGridContainer.defaultProps = {
    force: true
};

ConnectedGridContainer.propTypes = {
    grid: PropTypes.string.isRequired,
    baseUrl: PropTypes.string.isRequired,
    force: PropTypes.bool
};

export default ConnectedGridContainer;