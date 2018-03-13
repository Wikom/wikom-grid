/**
 * Created by rouven on 24.02.17.
 */

import React from 'react'
import PropTypes from 'prop-types'

const Row = ({children, grid, rowData, ...props}) =>
    <tr className={props.selection && props.selection.indexOf(rowData.id) !== -1 ? 'grid-row grid-row-selected' : 'grid-row'}>
        {
            React.Children.map(children, (child, colId) => React.cloneElement(child, {
                grid,
                rowData,
                colId,
                ...props
            }))
        }
    </tr>;

Row.propTypes = {
    children: PropTypes.node.isRequired,
    grid: PropTypes.string,
    rowData: PropTypes.object.isRequired
};

export default Row
