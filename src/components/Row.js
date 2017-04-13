/**
 * Created by rouven on 24.02.17.
 */

import React from 'react'
import PropTypes from 'prop-types'

const Row = ({children, grid, rowData}) =>
    <tr>
        {
            React.Children.map(children, (child) => React.cloneElement(child, {grid, rowData}))
        }
    </tr>;

Row.propTypes = {
    children: PropTypes.node.isRequired,
    grid: PropTypes.string,
    rowData: PropTypes.object.isRequired
};

export default Row;