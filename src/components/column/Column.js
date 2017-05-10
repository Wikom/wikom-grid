/**
 * Created by rouven on 23.02.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import findInObject from 'find-in-object'
import BaseColumn from './BaseColumn'

const Column = ({name, rowData, idx, ...rest}) =>
    <BaseColumn {...rest}>
        {findInObject(idx, rowData)}
    </BaseColumn>;

Column.propTypes = {
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object]).isRequired,
    rowData: PropTypes.object,
    idx: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

export default Column;