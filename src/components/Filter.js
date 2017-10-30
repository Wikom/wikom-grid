/**
 * Created by rouven on 06.04.17.
 */

import React from 'react'
import PropTypes from 'prop-types'

const Filter = ({children, className}) =>
    <div className={className}>
        {children}
    </div>;

Filter.defaultProps = {
    className: 'col-sm-6 col-md-4 col-lg-3 form-group filter-element'
};

Filter.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string
};

export default Filter;