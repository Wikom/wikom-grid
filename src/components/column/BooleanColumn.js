/**
 * Created by marvinruppelt on 02.06.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import findInObject from '@wikom/find-in-object'
import Symbol from '@wikom/react-symbol'
import BaseColumn from './BaseColumn'

const BooleanColumn = ({
                           name,
                           rowData,
                           idx,
                           withNull,
                           trueLabel,
                           falseLabel,
                           nullLabel,
                           ...rest
                       }) => {
    const value = findInObject(idx, rowData);
    const isTrue = [true, 'true', 1, '1', 'j', 'J'].indexOf(value) !== -1;
    const isFalse = withNull === false
        ? isTrue === false
        : [false, 'false', 0, '0', 'n', 'N'].indexOf(value) !== -1;

    return (
        <BaseColumn {...rest}>
            {
                isTrue === true
                    ? trueLabel
                    : (
                        isFalse === true
                            ? falseLabel
                            : nullLabel
                    )
            }
        </BaseColumn>
    );
};

BooleanColumn.defaultProps = {
    withNull: false,
    trueLabel: <Symbol symbol="check-square-o"/>,
    falseLabel: <Symbol symbol="square-o"/>,
    nullLabel: <Symbol symbol={{symbol: 'question', className: 'text-muted'}}/>
};

BooleanColumn.propTypes = {
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object]).isRequired,
    rowData: PropTypes.object,
    idx: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    withNull: PropTypes.bool,
    trueLabel: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    falseLabel: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    nullLabel: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ])
};

export default BooleanColumn;