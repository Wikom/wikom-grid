/**
 * Created by marvin.ruppelt on 24.09.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import EditableGrid from '../components/EditableGrid'
import {initializeGrid, setEditRow, destroyGrid, changeData} from '../actions'
import {PAGINATION_COUNT_FORMAT_SHORT} from '../components/Pagination'
import paginationType from '../components/propTypes/pagination'

const mapStateToProps = (state, {grid}) => ({
    edit: state.grid[grid].edit
});

const mapDispatchToProps = dispatch => ({
    setEditRow: (grid, idx) => dispatch(setEditRow(grid, idx)),
    initializeGrid: grid => dispatch(initializeGrid(grid)),
    destroyGrid: grid => dispatch(destroyGrid(grid)),
    changeData: (grid, data) => dispatch(changeData(grid, data))
});

const EditableGridContainer = connect(mapStateToProps, mapDispatchToProps)(EditableGrid);

EditableGridContainer.defaultProps = {
    pageSizes: [10, 20, 50],
    paginationAfterGrid: false,
    paginationCountFormat: PAGINATION_COUNT_FORMAT_SHORT
};

EditableGridContainer.propTypes = {
    children: PropTypes.node,
    data: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool.isRequired,
    pagination: PropTypes.shape(paginationType),
    grid: PropTypes.string.isRequired,
    pageSizes: PropTypes.arrayOf(PropTypes.number),
    paginationAfterGrid: PropTypes.bool,
    paginationCountFormat: PropTypes.func
};

export default EditableGridContainer;