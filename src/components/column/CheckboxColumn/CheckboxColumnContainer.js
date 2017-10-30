import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CheckboxColumnComponent from './CheckboxColumnComponent'
import CheckboxHeaderContainer from './CheckboxHeaderContainer'

import findInObject from 'find-in-object'
import {changeSelection} from '../../../actions/index'

const mapStateToProps = (state, {grid, idx, rowData}) => ({
    checked: state.grid[grid] && state.grid[grid].selection &&
    state.grid[grid].selection.indexOf(findInObject(idx, rowData)) !== -1
});

const mapDispatchToProps = (dispatch, {grid}) => ({
    onChange: evt => dispatch(changeSelection(grid, evt.target))
});

const CheckboxColumnContainer = connect(mapStateToProps, mapDispatchToProps)(CheckboxColumnComponent);

CheckboxColumnContainer.defaultProps = {
    idx: 'id',
    ThComponent: CheckboxHeaderContainer
};

export default CheckboxColumnContainer;