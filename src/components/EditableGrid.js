import React from 'react'
import Grid from './Grid'
import { setEditRow } from '../actions'

class EditableGrid extends Grid {
    constructor(props) {
        super(props);
        this._rowInEdit = null;

        this.createColumns(props.children);
        this._rows = this.buildRows(props);
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

        if (nextProps.edit.row !== this._rowInEdit) {
            this._rowInEdit = nextProps.edit.row;
            this.props.changeData(nextProps.grid, nextProps.edit);
            this._rows = this.buildRows(nextProps);
        }
    }

    createColumns(children) {
        let columns = [];
        let editColumnsTemp = {};
        let editColumns = [];

        React.Children.forEach(children, (child) => {
            if (React.isValidElement(child)){
                if(child.type === Columns) {
                    React.Children.forEach(child.props.children, (col) => {
                        if (React.isValidElement(col)) {
                            columns.push(col);
                        }
                    });
                }

                if(child.type === EditColumns) {
                    React.Children.forEach(child.props.children, (col) => {
                        if (React.isValidElement(col)) {
                            if(col.props.idx){
                                editColumnsTemp[col.props.idx] = col;
                            }
                        }
                    });
                }
            }
        });

        for(let i in columns){
            let idx = columns[i].props.idx || false;
            editColumns[i] = (idx && editColumnsTemp.hasOwnProperty(idx)) ?
                editColumnsTemp[idx] : columns[i];
        }

        this._columns = columns;
        this._editColumns = editColumns;
    }

    buildRows({grid, isLoading, data, ...rest}) {
        console.log('buildRows', grid, this._rowInEdit, 'working??');

        return isLoading
            ? <FullRow colSpan={this._columns.length}><Loading/></FullRow>
            : (
                data && data.length > 0
                    ? data.map((rowData, i) =>
                    {
                        if(this._rowInEdit === i){
                            return (<Row rowData={rowData} key={i} rowId={i} grid={grid} editable={this.props.editRoute || false}>{this._editColumns}</Row>);
                        } else {
                            return (<Row rowData={rowData} key={i} rowId={i} grid={grid} editable={this.props.editRoute || false}>{this._columns}</Row>);
                        }
                    })
                    : <FullRow colSpan={this._columns.length}>Keine Ergebnisse vorhanden</FullRow>
            );
    }
}

const mapStateToProps = (state, {grid}) => ({
    edit: state.grid[grid].edit
});

const mapDispatchToProps = dispatch => ({
    setEditRow: (grid, idx) => dispatch(setEditRow(grid, idx))
});

const GridContainer = connect(mapStateToProps, mapDispatchToProps)(EditableGrid);

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