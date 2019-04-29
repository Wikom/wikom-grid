/**
 * Created by rouven on 01.03.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import findInObject from 'find-in-object'
import GridAction from '../GridAction'
import GridLink from '../GridLink'
import BaseColumn from './BaseColumn'

const createActions = (children, rowData, idx) => {
    return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === GridAction) {
            return React.cloneElement(child, {
                action: () => child.props.action(findInObject(idx, rowData)),
                rowData,
                idx
            })
        }
        if (React.isValidElement(child) && child.type === GridLink) {
            return React.cloneElement(child, {
                to: child.props.to + '/' + findInObject(idx, rowData),
                rowData,
                idx
            })
        }
        if (React.isValidElement(child) && (typeof child.type === 'function' || typeof child.type === 'object')) {
            return React.cloneElement(child, {
                rowData
            })
        }
        return child;
    });
};

const ActionColumn = ({name, rowData, idx, children, className, onClick, ...rest}) => {
    const actions = createActions(children, rowData, idx);

    switch (typeof className){
        case 'string':
            className += ' table-actioncell';
            break;

        case 'object':
            if (className.td) {
                className = className.td + ' table-actioncell';
            }
            break;
    }
    return (
        <BaseColumn {...rest} className={className}>
            {actions}
        </BaseColumn>
    );
};

ActionColumn.defaultProps = {
    idx: 'id',
    sortable: false,
    className: 'text-nowrap'
};

ActionColumn.propTypes = {
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object]).isRequired,
    rowData: PropTypes.object,
    idx: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    children: PropTypes.node,
    sortable: PropTypes.bool
};

export default ActionColumn;