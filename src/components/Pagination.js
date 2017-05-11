/**
 * Created by rouven on 06.03.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Pager from 'react-pager'
import paginationType from './propTypes/pagination'

import {changePage, changePageSize} from '../actions'

const renderPageSizeOptions = (pageSizes = [5, 10, 25, 50]) =>
    pageSizes.map((value, i) => <option {...value} key={'psso_' + i}>{value}</option>);

const Pagination = ({grid, currentPage, pageCount, perPage, totalCount, handlePageChanged, handlePageSizeChanged}) =>
    <div className="row grid-before-table">
        <div className="col-md-3">
            <div className="grid-filter grid-filter--entries">
                {totalCount} Zeile(n)
            </div>
        </div>
        <div className="col-md-6">
            <div className="text-center">
                <Pager total={pageCount}
                       current={currentPage - 1}
                       titles={{
                           first: 'Erste Seite',
                           prev: '\u00AB',
                           prevSet: '...',
                           nextSet: '...',
                           next: '\u00BB',
                           last: 'Letzte Seite'
                       }}
                       visiblePages={5}
                       onPageChanged={(nextPage) => handlePageChanged(nextPage, grid)}
                />
            </div>
        </div>
        <div className="col-md-3 text-right">
            <div className="grid-filter grid-filter--entries-per-page">
                <div className="form-inline">
                    <label htmlFor="pagesizeSelect">Einträge pro Seite:</label>
                    <select
                        value={perPage}
                        name="pagesizeSelect"
                        className="input-sm form-control"
                        onChange={(evt) => handlePageSizeChanged(evt, grid)}
                    >
                        {renderPageSizeOptions()}
                    </select>
                </div>
            </div>
        </div>
    </div>;

Pagination.defaultProps = {
    pageCount: 0
};

Pagination.propTypes = Object.assign({
    grid: PropTypes.string.isRequired,
}, paginationType);

const mapDispatchToProps = (dispatch) => ({
    handlePageSizeChanged: (evt, grid) => dispatch(changePageSize(evt, grid)),
    handlePageChanged: (nextPage, grid) => dispatch(changePage(nextPage, grid))
});

export default connect(null, mapDispatchToProps)(Pagination);