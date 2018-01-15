import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import FilterComponent from './FilterComponent'

const mapState = ({grid}, {grid: gridname, name, className}) => ({
    className: grid[gridname]
        && grid[gridname].filter.hasOwnProperty(name)
        && grid[gridname].filter[name] !== null
        && grid[gridname].filter[name] !== ""
        && className + ' filter_active'
        || className
});

const FilterContainer = connect(mapState)(FilterComponent);

FilterContainer.defaultProps = {
    className: 'col-sm-6 col-md-4 col-lg-3 form-group filter-element'
};

FilterContainer.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    grid: PropTypes.string
};

export default FilterContainer