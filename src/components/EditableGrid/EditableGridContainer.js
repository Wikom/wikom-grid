/**
 * Created by marvin.ruppelt on 24.09.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import EditableGridComponent from './EditableGridComponent'
import {initializeGrid, destroyGrid, changeData} from '../../actions/index'
import {PAGINATION_COUNT_FORMAT_SHORT} from '../Pagination'
import paginationType from '../propTypes/pagination'

const mapStateToProps = (state, {grid}) => ({
    edit: state.grid[grid].edit
});

const mapDispatchToProps = dispatch => ({
    initializeGrid: grid => dispatch(initializeGrid(grid)),
    destroyGrid: grid => dispatch(destroyGrid(grid)),
    changeData: (grid, data) => dispatch(changeData(grid, data))
});

const EditableGrid = connect(mapStateToProps, mapDispatchToProps)(EditableGridComponent);

EditableGrid.defaultProps = {
    pageSizes: [10, 20, 50],
    paginationAfterGrid: false,
    paginationCountFormat: PAGINATION_COUNT_FORMAT_SHORT
};

EditableGrid.propTypes = {
    children: PropTypes.node,
    data: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool.isRequired,
    pagination: PropTypes.shape(paginationType),
    grid: PropTypes.string.isRequired,
    pageSizes: PropTypes.arrayOf(PropTypes.number),
    paginationAfterGrid: PropTypes.bool,
    paginationCountFormat: PropTypes.func
};

export default EditableGrid;