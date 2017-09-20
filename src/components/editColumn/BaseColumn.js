/**
 * Created by marvin.ruppelt on 20.09.17.
 */

import React from 'react'
import PropTypes from 'prop-types'

const BaseColumn = ({className, children}) => {
    const tdProps = {};

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
            {children}
        </td>
    );
};

BaseColumn.propTypes = {
    className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    children: PropTypes.node
};

export default BaseColumn;