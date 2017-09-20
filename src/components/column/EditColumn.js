/**
 * Created by marvin.ruppelt on 19.09.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import findInObject from 'find-in-object'
import BaseColumn from './BaseColumn'

const EditColumn = ({rowData, idx, children, ...rest}) => {
    console.log('editcolumn', rowData, idx, children, rest);
    return (
        <BaseColumn {...rest}>
            edit:
            {children}
        </BaseColumn>);
};

EditColumn.propTypes = {
    rowData: PropTypes.object,
    idx: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

export default EditColumn;