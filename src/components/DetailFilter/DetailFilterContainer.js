import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import DetailFilterComponent from './DetailFilterComponent'

export const mapState = ({routing: {location: {search}}}) => ({
    withDetailFilter: queryString.parse(search).withDetailFilter === '1'
});

const DetailFilterContainer = connect(mapState)(DetailFilterComponent);

DetailFilterContainer.defaultProps = {
    className: 'col-sm-6 col-md-4 col-lg-3 form-group filter-element'
};

DetailFilterContainer.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    grid: PropTypes.string
};

export default DetailFilterContainer