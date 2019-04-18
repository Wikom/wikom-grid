import React from 'react'
import PropTypes from 'prop-types'
import GridFilterDefaultTemplate from './GridFilterDefaultTemplate'

const GridFilterComponent = ({handleSubmit, onSubmit, children, Template, ...rest}) =>
    children instanceof Array
    && children.length > 0
    && (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Template {...rest}>
                {children}
            </Template>
        </form>
    );

GridFilterComponent.defaultProps = {
    Template: GridFilterDefaultTemplate
};

GridFilterComponent.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node,
    Template: PropTypes.oneOfType(PropTypes.object, PropTypes.func)
};

export default GridFilterComponent