/**
 * Created by rouven on 06.04.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const Filter = ({children, className}) =>
    <div className={className}>
        {children}
    </div>;

const mapStateToProps = (state, props) => ({
    className: props.className
});

const FilterContainer = connect(mapStateToProps)(Filter);

FilterContainer.defaultProps = {
    className: 'col-sm-6 col-md-4 col-lg-3 form-group filter-element'
};

FilterContainer.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string
};

export default FilterContainer;