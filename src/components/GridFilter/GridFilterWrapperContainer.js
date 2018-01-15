import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {initializeFilter} from '../../actions/index'
import GridFilterWrapperComponent from './GridFilterWrapperComponent'

const mapDispatchForWrapper = (dispatch, {grid, initialValues}) => ({
    initializeFilter: () => dispatch(initializeFilter(grid, initialValues))
});

const GridFilterWrapperContainer = connect(null, mapDispatchForWrapper)(GridFilterWrapperComponent);

GridFilterWrapperContainer.propTypes = {
    grid: PropTypes.string.isRequired,
    initialValues: PropTypes.object
};

export default GridFilterWrapperContainer