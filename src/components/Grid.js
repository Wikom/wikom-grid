/**
 * Created by rouven on 23.02.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Columns from './Columns'
import Row from './Row'
import Header from './Header'
import FullRow from './FullRow'
import Loading from 'react-loading'
import Pagination from './Pagination'
import {initializeGrid, destroyGrid, changeData} from '../actions'
import paginationType from './propTypes/pagination'

class Grid extends React.Component {

    constructor(props) {
        super(props);

        // console.log('---grid constructor---');
        this._columns = this.createColumns(props.children);
        this._rows = this.buildRows(props);
    }

    componentDidMount() {
        this.props.initializeGrid(this.props.grid);
        this.props.changeData(this.props.grid, this.props.data);
    }

    componentWillReceiveProps(nextProps) {
        // console.log('---grid will receive props---');
        // console.log(this.props);
        // console.log(nextProps);
        if (this.props.grid !== nextProps.grid) {
            this.props.destroyGrid(this.props.grid);
            this.props.initializeGrid(nextProps.grid);
            this._columns = this.createColumns(nextProps.children);
        }

        if (JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
            this.props.changeData(nextProps.grid, nextProps.data);
        // if (this.props.isLoading !== nextProps.isLoading) {
            // console.log('---isLoading changed---');
            this._rows = this.buildRows(nextProps);
        }
    }

    componentWillUnmount() {
        this.props.destroyGrid(this.props.grid);
    }

    createColumns(children) {
        let columns = [];

        React.Children.forEach(children, (child) => {
            if (React.isValidElement(child) && child.type === Columns) {
                React.Children.forEach(child.props.children, (col) => {
                    if (React.isValidElement(col)) {
                        columns.push(col);
                    }
                });
            }
        });

        return columns;
    }

    buildRows({grid, isLoading, data}) {
        return isLoading
            ? <FullRow colSpan={this._columns.length}><Loading/></FullRow>
            : (
                data && data.length > 0
                    ? data.map((rowData) => <Row rowData={rowData} key={rowData.id} grid={grid}>{this._columns}</Row>)
                    : <FullRow colSpan={this._columns.length}>Keine Ergebnisse vorhanden</FullRow>
            );
    }

    render() {
        const {grid, pagination, handleSort, activeSort, actions} = this.props;
        const hasPagination = pagination && grid;
        const header = <Header
            grid={grid}
            columns={this._columns}
            handleSort={handleSort}
            activeSort={activeSort}
        />;

        return (
            <div className="grid-view">
                <div className="box">
                    <div className="box-body">
                        {actions}
                        {hasPagination ? <Pagination grid={grid} {...pagination}/> : null}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-grid">
                                    <div className="table-responsive">
                                        <table
                                            className="table table-striped table-hover table-bordered table-condensed">
                                            <thead>
                                            {header}
                                            </thead>
                                            <tbody>
                                            {this._rows}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Grid.propTypes = {
    children: PropTypes.node,
    data: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool.isRequired,
    pagination: PropTypes.shape(paginationType),
    grid: PropTypes.string.isRequired,
    initializeGrid: PropTypes.func.isRequired,
    destroyGrid: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    initializeGrid: grid => dispatch(initializeGrid(grid)),
    destroyGrid: grid => dispatch(destroyGrid(grid)),
    changeData: (grid, data) => dispatch(changeData(grid, data))
});

export default connect(null, mapDispatchToProps)(Grid);