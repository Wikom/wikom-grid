/**
 * Created by rouven on 23.02.17.
 */

import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Columns from './Columns'
import Row from './Row'
import Header from './Header'
import FullRow from './FullRow'
import Loading from 'react-loading'
import Pagination, {PAGINATION_COUNT_FORMAT_SHORT} from './Pagination'
import {initializeGrid, destroyGrid, changeData} from '../actions'
import paginationType from './propTypes/pagination'

class Grid extends React.Component {
    constructor(props) {
        super(props);

        this.createColumns(props.children);
        this._rows = this.buildRows(props);
    }

    componentDidMount() {
        this.props.initializeGrid(this.props.grid);
        this.props.changeData(this.props.grid, this.props.data);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.grid !== nextProps.grid) {
            this.props.destroyGrid(this.props.grid);
            this.props.initializeGrid(nextProps.grid);

            this.createColumns(nextProps.children);
        }

        if (JSON.stringify(this.props.isLoading) !== JSON.stringify(nextProps.isLoading)
            || JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
            this.props.changeData(nextProps.grid, nextProps.data);

            this._rows = this.buildRows(nextProps);
        }
    }

    componentWillUnmount() {
        this.props.destroyGrid(this.props.grid);
    }

    createColumns(children) {
        let columns = [];

        React.Children.forEach(children, (child) => {
            if (React.isValidElement(child)) {
                if (child.type === Columns) {
                    React.Children.forEach(child.props.children, (col) => {
                        if (React.isValidElement(col)) {
                            columns.push(col);
                        }
                    });
                }
            }
        });

        this._columns = columns;
    }

    buildRows({grid, isLoading, data, ...rest}) {
        return isLoading
            ? <FullRow colSpan={this._columns.length}><Loading/></FullRow>
            : (
                data && data.length > 0
                    ? data.map((rowData, i) =>
                        <Row rowData={rowData} key={i} rowId={i} grid={grid}>
                            {this._columns}
                        </Row>
                    ) : <FullRow colSpan={this._columns.length}>Keine Ergebnisse vorhanden</FullRow>
            );
    }

    render() {
        const {grid, pagination, handleSort, activeSort, actions, pageSizes, paginationAfterGrid, paginationCountFormat} = this.props;
        const hasPagination = pagination && grid;
        const header = <Header
            grid={grid}
            columns={this._columns}
            handleSort={handleSort}
            activeSort={activeSort}
        />;
        const className = this.props.className || "table table-striped table-hover table-bordered table-condensed";

        return (
            <div className="grid-view">
                <div className="box">
                    <div className="box-body">
                        {actions}
                        {
                            hasPagination && paginationAfterGrid === false
                                ? <Pagination grid={grid} pageSizes={pageSizes}
                                              paginationCountFormat={paginationCountFormat} {...pagination}/>
                                : null
                        }
                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-grid">
                                    <div className="table-responsive">
                                        <table
                                            className={className}>
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
                        {
                            hasPagination && paginationAfterGrid === true
                                ? <Pagination grid={grid} pageSizes={pageSizes}
                                              paginationCountFormat={paginationCountFormat} {...pagination}/>
                                : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    initializeGrid: grid => dispatch(initializeGrid(grid)),
    destroyGrid: grid => dispatch(destroyGrid(grid)),
    changeData: (grid, data) => dispatch(changeData(grid, data))
});

const GridContainer = connect(null, mapDispatchToProps)(Grid);

GridContainer.defaultProps = {
    pageSizes: [10, 20, 50],
    paginationAfterGrid: false,
    paginationCountFormat: PAGINATION_COUNT_FORMAT_SHORT
};

GridContainer.propTypes = {
    children: PropTypes.node,
    data: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool.isRequired,
    pagination: PropTypes.shape(paginationType),
    grid: PropTypes.string.isRequired,
    pageSizes: PropTypes.arrayOf(PropTypes.number),
    paginationAfterGrid: PropTypes.bool,
    paginationCountFormat: PropTypes.func
};

export default GridContainer;