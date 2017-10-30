import React from 'react'
import PropTypes from 'prop-types'

import findInObject from 'find-in-object'
import BaseColumn from '../BaseColumn'

const CheckboxColumn = ({rowData, idx, checked, onChange, className, ...rest}) =>
    <BaseColumn {...rest} className={(className ? className + ' ' : '') + 'text-center table__check-bulk'}>
        <input
            type="checkbox"
            name="row-is-selected"
            value={findInObject(idx, rowData)}
            checked={checked}
            onChange={onChange}
        />
    </BaseColumn>;

CheckboxColumn.defaultProps = {
    checked: false
};

CheckboxColumn.propTypes = {
    rowData: PropTypes.object,
    idx: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    checked: PropTypes.bool
};

export default CheckboxColumn