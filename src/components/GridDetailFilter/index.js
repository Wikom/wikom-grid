import React from 'react'
import GridFilter from '../GridFilter'
import GridFilterDetailTemplate from './GridFilterDetailTemplate'

const GridDetailFilter = ({children, ...props}) => (
    <GridFilter {...props}>
        {children}
    </GridFilter>
);

GridDetailFilter.defaultProps = {
    Template: GridFilterDetailTemplate
};

export default GridDetailFilter