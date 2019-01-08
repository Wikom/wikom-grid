/**
 * Created by rouven on 09.03.17.
 */

import React from 'react'
import PropTypes from 'prop-types'

const BaseColumn = ({className, onClick, children, cellWidth}) => {
    const tdProps = {onClick};

    switch (typeof className) {
        case 'object':
            if (className.td) {
                tdProps.className = className.td;
            }
            break;
        case 'string':
            tdProps.className = className;
            break;
    }

    return (
        <td {...tdProps}>
            { cellWidth ? (<div style={{'width': cellWidth}}>{children}</div>) : children }
        </td>
    );
};

BaseColumn.propTypes = {
    className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    children: PropTypes.node,
    cellWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
};

export default BaseColumn;