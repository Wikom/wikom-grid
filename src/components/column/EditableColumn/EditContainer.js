import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import findInObject from '@wikom/find-in-object';
import {actions} from '@wikom/wikom-data';
import {SUBMIT_STATUS_FAILURE, SUBMIT_STATUS_PENDING, SUBMIT_STATUS_SUCCESS} from '../../../constants';
import EditComponent from './EditComponent';
import {handleSubmit} from '../../../actions';

const EditContainer = ({
                           grid,
                           rowId,
                           colId,
                           idx,
                           component,
                           rowData,
                           editRoute,
                           submitStatus,
                           onFocus,
                           onBlur,
                           cellInEdit
                       }) => {
    const wrapperClass = classNames({
        'ajaxsubmit-wrapper': true,
        'ajaxsubmit-error': submitStatus === SUBMIT_STATUS_FAILURE,
        'ajaxsubmit-loading': submitStatus === SUBMIT_STATUS_PENDING,
        'ajaxsubmit-success': submitStatus === SUBMIT_STATUS_SUCCESS
    });

    return React.createElement(EditComponent, {
        component,
        form: 'gridedit_' + grid + '_' + rowId + '_' + colId,
        grid,
        idx,
        initialValues: {[idx]: findInObject(idx, rowData)},
        onSubmit: (values, dispatch, props) => dispatch(handleSubmit(values, grid, rowData, editRoute)),
        onSubmitFail: (errors, dispatch, submitError, props) => {
            if (submitError.status === 422) {
                const error = {
                    status: 422,
                    response: {
                        body: {
                            name: 'Die Angaben des Formulars enthalten schwerwiegende Fehler.',
                            message: []
                        }
                    }
                };
                for (let errorMessage of submitError.response.body) {
                    error.response.body.message.push(errorMessage.message);
                }

                dispatch(actions.loadDataFailure({error}));
            }
        },
        onFocus,
        onBlur,
        submitStatus,
        cellInEdit,
        wrapperClass,
        disabled: submitStatus === SUBMIT_STATUS_PENDING,
        enableReintialize: true
    });
};

EditContainer.propTypes = {
    idx: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    rowData: PropTypes.object,
    component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
    ]),
    grid: PropTypes.string,
    rowId: PropTypes.number,
    colId: PropTypes.number,
    editRoute: PropTypes.string.isRequired,
    onFocus: PropTypes.func.isRequired
};

export default EditContainer;