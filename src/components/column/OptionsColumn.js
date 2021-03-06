/**
 * Created by rouven on 08.03.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import findInObject from '@wikom/find-in-object'
import BaseColumn from './BaseColumn'

const OptionsColumn = ({name, rowData, idx, options, ...rest}) =>
    <BaseColumn {...rest}>
        {options[findInObject(idx, rowData)]}
    </BaseColumn>;

OptionsColumn.propTypes = {
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object]).isRequired,
    rowData: PropTypes.object,
    idx: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    options: PropTypes.object.isRequired
};

export default OptionsColumn;