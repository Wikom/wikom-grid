import React from 'react'
import PropTypes from 'prop-types'
import Filter from '../Filter'

const DetailFilterComponent = ({grid, name, className, children, withDetailFilter}) =>
    withDetailFilter
    &&
    <Filter name={name} className={className} grid={grid}>
        {children}
    </Filter>;

DetailFilterComponent.defaultProps = {
    className: 'col-sm-6 col-md-4 col-lg-3 form-group filter-element',
    withDetailFilter: false
};

DetailFilterComponent.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    grid: PropTypes.string.isRequired,
    withDetailFilter: PropTypes.bool.isRequired
};
export default DetailFilterComponent