/**
 * Created by rouven on 17.03.17.
 */

import React from 'react'
import {connect} from 'react-redux'
import {applyFilter, initializeFilter} from '../../actions/index'
import {reduxForm} from 'redux-form'
import Symbol from 'react-symbol'
import Filter from '../Filter'

const GridFilterDefaultTemplate = ({clearFilter, children}) =>
    <div className="box box-default box-solid grid-search">
        <div className="box-header with-border">
            <h3 className="box-title">Filter</h3>
            <div className="box-tools pull-right">
                <button type="button" onClick={clearFilter}
                        className="btn btn-xs btn-default btn-filterReset">
                    <Symbol symbol="undo"/> Filter zurücksetzen
                </button>
            </div>
        </div>
        <div className="box-body">
            <div id="filter_row" className="row">
                {children}
            </div>
            <div id="filter_apply_row" className="filterapply-wrapper">
                <button type="submit" className="btn btn-sm btn-primary">
                    <Symbol symbol="filter"/>
                    Filter anwenden
                </button>
            </div>
        </div>
    </div>;

const GridFilter = ({handleSubmit, onSubmit, children, Template, ...rest}) => {
    if (!(children instanceof Array) || !children.length) {
        return null;
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Template {...rest}>
                {children}
            </Template>
        </form>);
};
GridFilter.defaultProps = {
    Template: GridFilterDefaultTemplate
};

const FilterForm = reduxForm({
    enableReinitialize: true
})(GridFilter);

const mapStateToProps = (state, props) => ({
    form: props.grid + 'Filter',
    initialValues: Object.assign({}, props.initialValues || {}, state.grid[props.grid] && state.grid[props.grid].filter),
    children: React.Children.map(props.children, child => {
        if (React.isValidElement(child) && child.type === Filter && state.grid[props.grid]
            && state.grid[props.grid].filter.hasOwnProperty(child.props.name) && state.grid[props.grid].filter[child.props.name] !== null && state.grid[props.grid].filter[child.props.name] !== "") {
            return React.cloneElement(child, {className: child.props.className + ' filter_active'});
        } else {
            return child;
        }
    })
});

const mapDispatchToProps = (dispatch, props) => ({
    onSubmit: (data) => dispatch(applyFilter(data, props.grid)),
    clearFilter: () => dispatch(applyFilter(props.initialValues || {}, props.grid))
});

const GridFilterContainer = connect(mapStateToProps, mapDispatchToProps)(FilterForm);

class GridFilterWrapper extends React.Component {

    componentDidMount() {
        this.props.initializeFilter();
    }

    render() {
        return (
            <GridFilterContainer {...this.props}/>
        );
    }
}

const mapDispatchForWrapper = (dispatch, props) => ({
    initializeFilter: () => dispatch(initializeFilter(props.grid, props.initialValues))
});

export default connect(null, mapDispatchForWrapper)(GridFilterWrapper);