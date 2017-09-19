/**
 * Created by marvin.ruppelt on 19.09.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import findInObject from 'find-in-object'
import BaseColumn from './BaseColumn'

const EditColumn = ({name, rowData, idx, children, ...rest}) =>
    <BaseColumn {...rest}>
        edit:
        {children}
    </BaseColumn>;

EditColumn.propTypes = {
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object]).isRequired,
    rowData: PropTypes.object,
    idx: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

export default EditColumn;