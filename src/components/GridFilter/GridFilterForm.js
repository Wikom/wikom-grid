import React from 'react'
import {reduxForm} from 'redux-form'
import GridFilterComponent from './GridFilterComponent'

const GridFilterForm = reduxForm({
    enableReinitialize: true
})(GridFilterComponent);

export default GridFilterForm