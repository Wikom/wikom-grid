/**
 * Created by marvinruppelt on 02.06.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import findInObject from '@wikom/find-in-object'
import Symbol from '@wikom/react-symbol'
import BaseColumn from './BaseColumn'

const BoolColumn = ({name, rowData, idx, withNull, type, ...rest}) => {
    const value = findInObject(idx, rowData);
    const isTrue = [true, 'true', 1, '1', 'j', 'J'].indexOf(value) !== -1;
    const isFalse = withNull === false
        ? isTrue === false
        : [false, 'false', 0, '0', 'n', 'N'].indexOf(value) !== -1;

    if (type == 'string') {
        return (
            <BaseColumn {...rest}>
                {
                    isTrue === true
                        ? <span>ja</span>
                        : (
                            isFalse === true
                                ? <span>nein</span>
                                : null
                        )
                }
            </BaseColumn>
        );
    }

    // else: type == symbol
    return (
        <BaseColumn {...rest}>
            {
                isTrue === true
                    ? <Symbol symbol={{symbol: "check", className: "text-success"}}/>
                    : (
                        isFalse === true
                            ? <Symbol symbol={{symbol: "times", className: "text-danger"}}/>
                            : null
                    )
            }
        </BaseColumn>
    );
};

BoolColumn.defaultProps = {
    withNull: false,
    type: 'symbol'
};

BoolColumn.propTypes = {
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object]).isRequired,
    rowData: PropTypes.object,
    idx: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    withNull: PropTypes.bool,
    type: PropTypes.string
};

export default BoolColumn;