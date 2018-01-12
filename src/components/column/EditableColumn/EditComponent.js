import React from 'react'
import PropTypes from 'prop-types'
import {reduxForm, Field} from 'redux-form'

const EditComponent = ({
                           component,
                           handleSubmit,
                           idx,
                           dirty,
                           onFocus,
                           onBlur,
                           cellInEdit,
                           wrapperClass,
                           disabled
                       }) =>
    <div className={wrapperClass}>
        <Field
            autoFocus={cellInEdit}
            name={idx}
            component={component}
            className='form-control'
            onFocus={onFocus}
            onBlur={(evt, value, prev) => {
                if (dirty) {
                    handleSubmit();
                }
                onBlur();
            }}
            disabled={disabled}
            normalize={v => typeof v === 'boolean' ? (v === true ? '1' : '0') : v}
        />
    </div>;

EditComponent.defaultProps = {
    component: 'input'
};

EditComponent.propTypes = {
    component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
    ]),
    handleSubmit: PropTypes.func,
    idx: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    dirty: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    cellInEdit: PropTypes.bool,
    wrapperClass: PropTypes.string,
    disabled: PropTypes.bool
};

export {EditComponent as RawEditComponent}
export default reduxForm()(EditComponent)