/**
 * Created by rouven on 12.05.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import BaseColumn from './BaseColumn'
import findInObject from 'find-in-object'

const countValues = (data) => data instanceof Array ? data.length : 0;

const CountColumn = ({name, rowData, idx, ...rest}) =>
    <BaseColumn {...rest}>
        {
            countValues(findInObject(idx, rowData))
        }
    </BaseColumn>;

CountColumn.propTypes = {
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object]).isRequired,
    rowData: PropTypes.object,
    idx: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired
};

export default CountColumn