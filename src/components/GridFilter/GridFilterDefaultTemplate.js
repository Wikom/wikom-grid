import React from 'react'
import Symbol from 'react-symbol'

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

export default GridFilterDefaultTemplate