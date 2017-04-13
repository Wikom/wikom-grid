/**
 * Created by rouven on 02.03.17.
 */

import React from 'react'
import PropTypes from 'prop-types'

const FullRow = ({colSpan, children}) =>
    <tr key="1">
        <td colSpan={colSpan} className="text-center">
            {children}
        </td>
    </tr>;

FullRow.propTypes = {
    colSpan: PropTypes.number.isRequired,
    children: PropTypes.node
};

export default FullRow;