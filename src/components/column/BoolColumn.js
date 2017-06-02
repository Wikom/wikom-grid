/**
 * Created by marvinruppelt on 02.06.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import findInObject from 'find-in-object'
import Symbol from 'react-symbol'
import BaseColumn from './BaseColumn'

const BoolColumn = ({name, rowData, idx, ...rest}) => {

    return (
        <BaseColumn {...rest}>
            {findInObject(idx, rowData) ?
                <Symbol symbol={{symbol: "check", className:"text-success"}} /> :
                <Symbol symbol={{symbol: "times", className:"text-danger"}} />}
        </BaseColumn>
    );
};

BoolColumn.propTypes = {
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object]).isRequired,
    rowData: PropTypes.object,
    idx: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

export default BoolColumn;