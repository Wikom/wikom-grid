/**
 * Created by marvin.ruppelt on 20.09.17.
 */

import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import findInObject from 'find-in-object'
import BaseEditColumn from './BaseEditColumn'
import {submitField, fieldInSubmission, fieldChanged, fieldSaved, fieldSubmissionFailed} from '../../actions'
import {Field} from 'redux-form'
import {STATUS_INSUBMISSION} from "../../constants/fieldStatus";

const TextEditColumn = ({rowData, idx, url, grid, fieldSubmit, onChange, status, ...rest}) => {
    const fieldStatus = findInObject(idx, status);
     return (<BaseEditColumn status={fieldStatus} {...rest}>
        <Field
            name={idx}
            component="input"
            className="form-control"
            onBlur={(input, value) => {
                fieldSubmit(grid, rowData, idx, url, value);
            }}
            onFocus={() => onChange(grid, idx)}
            disabled={fieldStatus == STATUS_INSUBMISSION}
        />
    </BaseEditColumn>);
};

TextEditColumn.propTypes = {
    rowData: PropTypes.object,
    idx: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};
const mapDispatch = dispatch => ({
    fieldSubmit: (grid, rowData, idx, url, value) => {
        dispatch(fieldInSubmission(grid, idx));
        dispatch(submitField({grid, rowData, idx, url, value}))
            .then((result) => {
                dispatch(fieldSaved(grid, idx));
            })
            .catch((error) => {
                dispatch(fieldSubmissionFailed(grid, idx));
            })
    },
    onChange: (grid, idx) => {
        dispatch(fieldChanged(grid, idx));
    }
});

export default connect(null, mapDispatch)(TextEditColumn);