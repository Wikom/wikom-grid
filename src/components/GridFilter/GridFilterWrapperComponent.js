import React from 'react'
import PropTypes from 'prop-types'
import GridFilterContainer from './GridFilterContainer'

class GridFilterWrapperComponent extends React.Component {

    componentDidMount() {
        this.props.initializeFilter();
    }

    render() {
        return (
            <GridFilterContainer {...this.props}/>
        );
    }
}

GridFilterWrapperComponent.propTypes = {
    initializeFilter: PropTypes.func.isRequired
};

export default GridFilterWrapperComponent