/**
 * Created by rouven on 24.02.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import findInObject from 'find-in-object'
import moment from 'moment'
import BaseColumn from './BaseColumn'

const DateColumn = ({name, rowData, idx, format, ...rest}) => {

    return (
        <BaseColumn {...rest}>
            {moment.utc(findInObject(idx, rowData)).format(format || 'DD.MM.YYYY')}
        </BaseColumn>
    );
};

DateColumn.propTypes = {
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object]).isRequired,
    rowData: PropTypes.object,
    idx: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

export default DateColumn;