import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import EditableColumnComponent from './EditableColumnComponent'
import {editStart, editEnd} from '../../../actions'
import Column from "../Column";

const mapState = ({grid}, {grid: gridname, rowId, colId, rowData, idx}) => ({
    rowInEdit: grid[gridname].edit
        && grid[gridname].edit.rowId === rowId
        || false,
    cellInEdit: grid[gridname].edit
        && grid[gridname].edit.rowId === rowId
        && grid[gridname].edit.colId === colId
        || false,
    submitStatus: grid[gridname].edit
        && grid[gridname].edit.status
        && grid[gridname].edit.status[rowId]
        && grid[gridname].edit.status[rowId][colId]
        || null,
    changedRowData: grid[gridname].edit
        && grid[gridname].edit.values
        && grid[gridname].edit.values[rowId]
        && grid[gridname].edit.values[rowId].hasOwnProperty(colId)
        && {...rowData, [idx]: grid[gridname].edit.values[rowId][colId]}
        || null,
    hasValueChanged: grid[gridname].edit
        && grid[gridname].edit.values
        && grid[gridname].edit.values[rowId]
        && grid[gridname].edit.values[rowId].hasOwnProperty(colId)
        || false
});

const mapDispatch = (dispatch, {grid, rowId, colId}) => ({
    onClick: () => dispatch(editStart(grid, rowId, colId)),
    onBlur: () => dispatch(editEnd(grid, rowId, colId))
});

const EditableColumnContainer = connect(mapState, mapDispatch)(EditableColumnComponent);

EditableColumnContainer.defaultProps = {
    formComponent: 'input',
    component: Column
};

EditableColumnContainer.propTypes = {
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    rowId: PropTypes.number,
    colId: PropTypes.number,
    rowData: PropTypes.object,
    idx: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    component: PropTypes.func,
    formComponent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
    ])
};

export default EditableColumnContainer