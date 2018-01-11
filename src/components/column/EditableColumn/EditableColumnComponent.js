import React from 'react'
import PropTypes from 'prop-types'
import findInObject from 'find-in-object'
import BaseColumn from '../BaseColumn'
import EditContainer from './EditContainer'

const EditableColumnComponent = ({
                                     component,
                                     formComponent,
                                     cellInEdit,
                                     rowInEdit,
                                     idx,
                                     editRoute,
                                     submitStatus,
                                     rowData,
                                     changedRowData,
                                     hasValueChanged,
                                     ...props
                                 }) => {
    props.rowData = changedRowData || rowData;

    if (rowInEdit) {
        return (
            <BaseColumn>
                <EditContainer
                    idx={idx}
                    component={formComponent}
                    grid={props.grid}
                    colId={props.colId}
                    rowId={props.rowId}
                    rowData={props.rowData}
                    editRoute={editRoute}
                    submitStatus={submitStatus}
                    onFocus={props.onClick}
                    onBlur={props.onBlur}
                    cellInEdit={cellInEdit}
                />
            </BaseColumn>
        )
    }

    if (component) {
        if (hasValueChanged) {
            props.className = {td: 'text-success'};
        }
        return React.createElement(component, {idx, ...props});
    }

    return null;
};

EditableColumnComponent.defaultProps = {
    hasValueChanged: false
};

EditableColumnComponent.propTypes = {
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object]).isRequired,
    rowData: PropTypes.object,
    idx: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    component: PropTypes.func,
    formComponent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
    ]).isRequired,
    cellInEdit: PropTypes.bool.isRequired,
    rowInEdit: PropTypes.bool.isRequired,
    hasValueChanged: PropTypes.bool
};

export default EditableColumnComponent