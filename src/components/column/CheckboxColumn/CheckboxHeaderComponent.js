import React from 'react'
import PropTypes from 'prop-types'

const CheckboxHeaderComponent = ({grid, checked, onChange, allValues, cellWidth}) => {
    const input = <input
        type="checkbox"
        name="row-is-selected"
        value={allValues}
        checked={checked}
        onChange={onChange}
    />;

    return (<th className="text-center">
        { cellWidth ? (<div style={{'width': cellWidth}}>{input}</div>) : input }
    </th>)

};

CheckboxHeaderComponent.defaultProps = {
    cellWidth: false,
    checked: false
};

export default CheckboxHeaderComponent;