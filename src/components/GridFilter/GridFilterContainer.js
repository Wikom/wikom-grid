import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {applyFilter} from '../../actions/index'
import Filter from '../Filter/index'
import GridFilterForm from './GridFilterForm'

const mapStateToProps = ({grid}, {grid: gridname, initialValues, children}) => ({
    form: gridname + 'Filter',
    initialValues: Object.assign({}, initialValues || {}, grid[gridname] && grid[gridname].filter),
    children: React.Children.map(children, child =>
        React.isValidElement(child) && typeof child.type === 'object'
            ? React.cloneElement(child, {grid: gridname})
            : child
    )
});

const mapDispatchToProps = (dispatch, {grid, initialValues}) => ({
    onSubmit: data => dispatch(applyFilter(data, grid)),
    clearFilter: () => dispatch(applyFilter(initialValues || {}, grid))
});

const GridFilterContainer = connect(mapStateToProps, mapDispatchToProps)(GridFilterForm);

GridFilterContainer.propTypes = {
    grid: PropTypes.string.isRequired,
    initialValues: PropTypes.object,
    children: PropTypes.node
};

export default GridFilterContainer