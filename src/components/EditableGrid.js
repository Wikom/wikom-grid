import React from 'react'
import Grid from './Grid'
import Columns from './Columns'
import EditColumns from './EditColumns'
import Row from './Row'
import FullRow from './FullRow'
import Loading from 'react-loading'
import {reduxForm} from 'redux-form'
import {submit} from 'wikom-data'

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
            if (React.isValidElement(child)) {
                if (child.type === Columns) {
                    React.Children.forEach(child.props.children, (col) => {
                        if (React.isValidElement(col)) {
                            columns.push(col);
                        }
                    });
                }

                if (child.type === EditColumns) {
                    React.Children.forEach(child.props.children, (col) => {
                        if (React.isValidElement(col)) {
                            if (col.props.idx) {
                                editColumnsTemp[col.props.idx] = col;
                            }
                        }
                    });
                }
            }
        });

        for (let i in columns) {
            let idx = columns[i].props.idx || false;
            editColumns[i] = (idx && editColumnsTemp.hasOwnProperty(idx)) ?
                editColumnsTemp[idx] : columns[i];
        }

        this._columns = columns;
        this._editColumns = editColumns;
    }

    buildRows({grid, isLoading, data, ...rest}) {
        return isLoading
            ? <FullRow colSpan={this._columns.length}><Loading/></FullRow>
            : (
                data && data.length > 0
                    ? data.map((rowData, i) => {
                        if (this._rowInEdit === i) {
                            const EditRow = reduxForm({
                                form: grid + '_form',
                                initialValues: rowData,
                                submitHandler: data => submit({url: this.props.editRoute, data})
                            })(Row);

                            console.log(this.props.editRoute);

                            return (<EditRow rowData={rowData} key={i} rowId={i} grid={grid} url={this.props.editRoute}>
                                {this._editColumns}
                            </EditRow>);

                        } else {
                            return (<Row rowData={rowData} key={i} rowId={i} grid={grid}
                                         editable={this.props.hasOwnProperty('editRoute') || false}>{this._columns}</Row>);
                        }
                    })
                    : <FullRow colSpan={this._columns.length}>Keine Ergebnisse vorhanden</FullRow>
            );
    }
}

export default EditableGrid;