/**
 * Created by marvin.ruppelt on 20.09.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import * as fieldStatus from '../../constants/fieldStatus'

const BaseEditColumn = ({className, children, status}) => {
    let tdClassName = '';
    let ajaxWrapperClassName = 'ajaxsubmit-wrapper';

    switch (typeof className) {
        case 'object':
            if (className.td) {
                tdClassName = className.td;
            }
            break;
        case 'string':
            tdClassName = className;
            break;
    }

    switch (status) {
        case fieldStatus.STATUS_ERROR:
            ajaxWrapperClassName+=' ajaxsubmit-error';
            break;
        case fieldStatus.STATUS_INSUBMISSION:
            ajaxWrapperClassName+=' ajaxsubmit-loading';
            break;
        case fieldStatus.STATUS_SAVED:
            ajaxWrapperClassName+=' ajaxsubmit-success';
            break;
    }


    return (
        <td className={tdClassName}>
            <div className={ajaxWrapperClassName}>
                {children}
            </div>
        </td>
    );
};

BaseEditColumn.propTypes = {
    className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    children: PropTypes.node
};

export default BaseEditColumn;