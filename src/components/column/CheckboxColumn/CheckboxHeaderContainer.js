import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CheckboxHeaderComponent from './CheckboxHeaderComponent'
import {changeSelection} from '../../../actions/index'

const mapStateToHeaderProps = (state, {grid, idx}) => ({
    allValues: (state.grid[grid] && state.grid[grid].data) ? JSON.stringify(state.grid[grid].data.map(value => value[idx])) : '',
    checked: (state.grid[grid] && state.grid[grid].data && state.grid[grid].data.length > 0 && state.grid[grid].data.length === state.grid[grid].selection.length) === true
});

const mapDispatchToHeaderProps = (dispatch, {grid}) => ({
    onChange: evt => dispatch(changeSelection(grid, evt.target))
});

const CheckboxHeaderContainer = connect(mapStateToHeaderProps, mapDispatchToHeaderProps)(CheckboxHeaderComponent);

export default CheckboxHeaderContainer;