/**
 * Created by rouven on 24.02.17.
 */

import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {setEditRow} from "../actions";

const Row = ({rowId, children, grid, editable, rowData, setEditRow}) =>
    <tr>
        {
            React.Children.map(children, (child) => React.cloneElement(child, {
                grid,
                rowData,
                onClick: editable ? () => setEditRow(grid, rowId) : null
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
    setEditRow: (grid, index) => dispatch(setEditRow(grid, index))
});

export default connect(null, mapDispatchToProps)(Row);