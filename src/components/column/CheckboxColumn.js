/**
 * Created by rouven on 22.03.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import findInObject from 'find-in-object'
import BaseColumn from './BaseColumn'
import {changeSelection} from '../../actions'

const CheckboxColumn = ({rowData, idx, checked, onChange, className, ...rest}) =>
    <BaseColumn {...rest} className={(className ? className + ' ' : '') + 'text-center table__check-bulk'}>
        <input
            type="checkbox"
            name="row-is-selected"
            value={findInObject(idx, rowData)}
            checked={checked}
            onChange={onChange}
        />
    </BaseColumn>;

CheckboxColumn.defaultProps = {
    checked: false
};

CheckboxColumn.propTypes = {
    rowData: PropTypes.object,
    idx: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    checked: PropTypes.bool
};

const mapStateToProps = (state, {grid, idx, rowData}) => ({
    checked: state.grid[grid] && state.grid[grid].selection &&
    state.grid[grid].selection.indexOf(findInObject(idx, rowData)) !== -1
});

const mapDispatchToProps = (dispatch, {grid}) => ({
    onChange: evt => dispatch(changeSelection(grid, evt.target))
});

const CheckboxColumnContainer = connect(mapStateToProps, mapDispatchToProps)(CheckboxColumn);


const CheckboxHeader = ({grid, checked, onChange, allValues}) =>
    <th className="text-center">
        <input
            type="checkbox"
            name="row-is-selected"
            value={allValues}
            checked={checked}
            onChange={onChange}
        />
    </th>;

CheckboxHeader.defaultProps = {
    checked: false
};

const mapStateToHeaderProps = (state, {grid, idx}) => ({
    allValues: (state.grid[grid] && state.grid[grid].data) ? JSON.stringify(state.grid[grid].data.map(value => value[idx])) : '',
    checked: (state.grid[grid] && state.grid[grid].data && state.grid[grid].data.length > 0 && state.grid[grid].data.length === state.grid[grid].selection.length) === true
});

const mapDispatchToHeaderProps = (dispatch, {grid}) => ({
    onChange: evt => dispatch(changeSelection(grid, evt.target))
});

CheckboxColumnContainer.defaultProps = {
    idx: 'id',
    ThComponent: connect(mapStateToHeaderProps, mapDispatchToHeaderProps)(CheckboxHeader)
};

export default CheckboxColumnContainer;