import React from 'react'
import PropTypes from 'prop-types'

const FilterComponent = ({children, className}) =>
    <div className={className}>
        {children}
    </div>;

FilterComponent.defaultProps = {
    className: 'col-sm-6 col-md-4 col-lg-3 form-group filter-element'
};

FilterComponent.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string
};

export default FilterComponent;