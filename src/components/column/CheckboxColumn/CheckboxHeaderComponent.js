import React from 'react'
import PropTypes from 'prop-types'

const CheckboxHeaderComponent = ({grid, checked, onChange, allValues}) =>
    <th className="text-center">
        <input
            type="checkbox"
            name="row-is-selected"
            value={allValues}
            checked={checked}
            onChange={onChange}
        />
    </th>;

CheckboxHeaderComponent.defaultProps = {
    checked: false
};

export default CheckboxHeaderComponent;