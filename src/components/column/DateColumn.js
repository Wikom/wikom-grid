/**
 * Created by rouven on 24.02.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import findInObject from 'find-in-object'
import moment from 'moment'
import BaseColumn from './BaseColumn'

const DateColumn = ({name, rowData, idx, ...rest}) =>
    <BaseColumn {...rest}>
        {moment.utc(findInObject(idx, rowData)).format('DD.MM.YYYY')}
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