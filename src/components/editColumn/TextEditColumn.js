/**
 * Created by marvin.ruppelt on 20.09.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import findInObject from 'find-in-object'
import BaseColumn from './BaseColumn'
import {submitField} from '../../actions'

import {Field} from 'redux-form'

const TextEditColumn = ({rowData, idx, url, ...rest}) => {
    console.log('TextEditColumn', rest);

    return (<BaseColumn {...rest}>
        <Field
            name={idx}
            component="input"
            className="form-control"
            onBlur={(input, value) => {
                submitField({rowData, idx, url, value});
            }}
        />
    </BaseColumn>);
};

TextEditColumn.propTypes = {
    rowData: PropTypes.object,
    idx: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

export default TextEditColumn;