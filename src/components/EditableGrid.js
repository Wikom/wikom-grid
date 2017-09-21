import React from 'react'
import Grid from './Grid'
import { setEditRow } from '../actions'

class EditableGrid extends Grid {
    buildRows({grid, isLoading, data}) {
        return isLoading
            ? <FullRow colSpan={this._columns.length}><Loading/></FullRow>
            : (
                data && data.length > 0
                    ? data.map((rowData, i) => <Row rowData={rowData} key={i} grid={grid}>{this._columns}</Row>)
                    : <FullRow colSpan={this._columns.length}>Keine Ergebnisse vorhanden</FullRow>
            );
    }
}