/**
 * Created by rouven on 30.03.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import findInObject from 'find-in-object'
import BaseColumn from './BaseColumn'

const HtmlColumn = ({name, rowData, idx, ...rest}) =>
    <BaseColumn {...rest}>
        <span dangerouslySetInnerHTML={{__html: findInObject(idx, rowData)}}/>
    </BaseColumn>;

HtmlColumn.propTypes = {
    name: PropTypes.string.isRequired,
    rowData: PropTypes.object,
    idx: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

export default HtmlColumn;