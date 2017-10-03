/**
 * Created by rouven on 24.02.17.
 */

import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {setNextEditRow} from "../actions";

const Row = ({rowId, children, grid, editable, rowData, setNextEditRow, ...props}) =>
    <tr>
        {
            React.Children.map(children, (child) => React.cloneElement(child, {
                grid,
                rowData,
                onClick: editable ? () => setNextEditRow(grid, rowId) : null,
                ...props
            }))
        }
    </tr>;

Row.propTypes = {
    children: PropTypes.node.isRequired,
    grid: PropTypes.string,
    editable: PropTypes.bool,
    rowData: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
    setNextEditRow: (grid, index) => dispatch(setNextEditRow(grid, index))
});

export default connect(null, mapDispatchToProps)(Row);