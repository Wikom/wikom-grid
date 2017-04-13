/**
 * Created by rouven on 24.02.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import findInObject from 'find-in-object'
import BaseColumn from './BaseColumn'

const DateColumn = ({name, rowData, idx, ...rest}) =>
    <BaseColumn {...rest}>
        {(new Date(findInObject(idx, rowData))).toLocaleDateString()}
    </BaseColumn>;

DateColumn.propTypes = {
    name: PropTypes.string.isRequired,
    rowData: PropTypes.object,
    idx: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

export default DateColumn;