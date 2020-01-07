/**
 * Created by rouven on 23.02.17.
 */

import React from 'react'
import Columns from '../Columns'
import Row from '../Row'
import Header from '../Header'
import FullRow from '../FullRow'
import Loading from '@wikom/react-loading'
import Pagination from '../Pagination'

class GridComponent extends React.Component {
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
        } else if (JSON.stringify(this.props.selection) !== JSON.stringify(nextProps.selection)) {
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

        this._columns = columns;
    }

    buildRows({grid, isLoading, data, ...props}) {
        return isLoading
            ? <FullRow colSpan={this._columns.length}><Loading/></FullRow>
            : (
                data && data.length > 0
                    ? data.map((rowData, i) => <Row rowData={rowData} key={i} rowId={i} grid={grid} {...props}>{this._columns}</Row>)
                    : <FullRow colSpan={this._columns.length}>Keine Ergebnisse vorhanden</FullRow>
            );
    }

    render() {
        const {grid, pagination, handleSort, activeSort, actions, pageSizes, paginationAfterGrid, paginationCountFormat, boxHeader} = this.props;
        const hasPagination = pagination && grid;
        const header = <Header
            grid={grid}
            columns={this._columns}
            handleSort={handleSort}
            activeSort={activeSort}
        />;
        const tableClassName = this.props.tableClassName || "table table-striped table-hover table-bordered table-condensed";
        const boxClassName = this.props.boxClassName || "box";

        return (
            <div className="grid-view">
                <div className={boxClassName}>
                    {boxHeader || null}
                    <div className="box-body">
                        {actions}
                        {
                            hasPagination && paginationAfterGrid === false
                                ? <Pagination grid={grid} pageSizes={pageSizes} paginationCountFormat={paginationCountFormat} {...pagination}/>
                                : null
                        }
                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-grid">
                                    <div className="table-responsive">
                                        <table
                                            className={tableClassName}>
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
                                ? <Pagination grid={grid} pageSizes={pageSizes} paginationCountFormat={paginationCountFormat} {...pagination}/>
                                : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default GridComponent;