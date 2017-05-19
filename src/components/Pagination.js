/**
 * Created by rouven on 06.03.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Pager from 'react-pager'
import paginationType from './propTypes/pagination'

import {changePage, changePageSize} from '../actions'

export const PAGINATION_COUNT_FORMAT_SHORT = ({totalCount}) => (totalCount + ' Zeile(n)');
export const PAGINATION_COUNT_FORMAT_FULL = ({currentPage, pageCount, perPage, totalCount}) => {
    const valueFrom = (currentPage - 1) * perPage + 1;
    const valueTo = currentPage * perPage;

    return (valueFrom + ' bis ' + (valueTo < totalCount ? valueTo : totalCount)  + ' von ' + totalCount + ' Einträgen');
}

const renderPageSizeOptions = (pageSizes, perPage) => {
    if (pageSizes.indexOf(perPage) === -1) {
        pageSizes.push(perPage);

        pageSizes.sort((a, b) => a - b);
    }

    return pageSizes.map((value, i) => <option {...value} key={'psso_' + i}>{value}</option>);
};

const Pagination = ({grid, currentPage, pageCount, perPage, totalCount, handlePageChanged, handlePageSizeChanged, pageSizes, paginationCountFormat}) =>
    <div className="row grid-before-table">
        <div className="col-md-3">
            <div className="grid-filter grid-filter--entries">
                {paginationCountFormat({currentPage, pageCount, perPage, totalCount})}
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
                        {renderPageSizeOptions(pageSizes, perPage)}
                    </select>
                </div>
            </div>
        </div>
    </div>;

Pagination.defaultProps = {
    pageCount: 0,
    paginationCountFormat: PAGINATION_COUNT_FORMAT_SHORT
};

Pagination.propTypes = Object.assign({
    grid: PropTypes.string.isRequired,
    pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
    paginationCountFormat: PropTypes.func
}, paginationType);

const mapDispatchToProps = (dispatch) => ({
    handlePageSizeChanged: (evt, grid) => dispatch(changePageSize(evt, grid)),
    handlePageChanged: (nextPage, grid) => dispatch(changePage(nextPage, grid))
});

export default connect(null, mapDispatchToProps)(Pagination);