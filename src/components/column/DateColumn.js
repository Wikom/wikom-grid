/**
 * Created by rouven on 24.02.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import findInObject from '@wikom/find-in-object'
import moment from 'moment'
import BaseColumn from './BaseColumn'

const DateColumn = ({name, rowData, idx, format, ...rest}) => {
    const val = findInObject(idx, rowData);

    return (
        <BaseColumn {...rest}>
            {val ? moment.utc(val).format(format || 'DD.MM.YYYY') : null}
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