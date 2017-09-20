/**
 * Created by marvin.ruppelt on 20.09.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import findInObject from 'find-in-object'
import BaseColumn from './BaseColumn'

import {Field} from 'redux-form'


const TextEditColumn = ({rowData, idx, ...rest}) =>
    <BaseColumn {...rest}>
        <Field
            name={idx}
            component="input"
            className="form-control"
            initialValue={findInObject(idx, rowData)}
        />
    </BaseColumn>;

TextEditColumn.propTypes = {
    rowData: PropTypes.object,
    idx: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

export default TextEditColumn;