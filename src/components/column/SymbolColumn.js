/**
 * Created by rouven on 08.03.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import findInObject from 'find-in-object'
import Symbol from 'react-symbol'
import BaseColumn from './BaseColumn'

const SymbolColumn = ({name, rowData, idx, symbols, ...rest}) => {
    const symbol = symbols[findInObject(idx, rowData)];

    return (
        <BaseColumn {...rest}>
            {symbol ? <Symbol symbol={symbol}/> : null}
        </BaseColumn>
    );
};

SymbolColumn.propTypes = {
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object]).isRequired,
    rowData: PropTypes.object,
    idx: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    symbols: PropTypes.object.isRequired
};

export default SymbolColumn;