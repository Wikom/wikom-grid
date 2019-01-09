'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _findInObject = require('find-in-object');

var _findInObject2 = _interopRequireDefault(_findInObject);

var _wikomData = require('wikom-data');

var _constants = require('../../../constants');

var _EditComponent = require('./EditComponent');

var _EditComponent2 = _interopRequireDefault(_EditComponent);

var _actions = require('../../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EditContainer = function EditContainer(_ref) {
    var grid = _ref.grid,
        rowId = _ref.rowId,
        colId = _ref.colId,
        idx = _ref.idx,
        component = _ref.component,
        rowData = _ref.rowData,
        editRoute = _ref.editRoute,
        submitStatus = _ref.submitStatus,
        onFocus = _ref.onFocus,
        onBlur = _ref.onBlur,
        cellInEdit = _ref.cellInEdit;

    var wrapperClass = (0, _classnames2.default)({
        'ajaxsubmit-wrapper': true,
        'ajaxsubmit-error': submitStatus === _constants.SUBMIT_STATUS_FAILURE,
        'ajaxsubmit-loading': submitStatus === _constants.SUBMIT_STATUS_PENDING,
        'ajaxsubmit-success': submitStatus === _constants.SUBMIT_STATUS_SUCCESS
    });

    return _react2.default.createElement(_EditComponent2.default, {
        component: component,
        form: 'gridedit_' + grid + '_' + rowId + '_' + colId,
        grid: grid,
        idx: idx,
        initialValues: _defineProperty({}, idx, (0, _findInObject2.default)(idx, rowData)),
        onSubmit: function onSubmit(values, dispatch, props) {
            return dispatch((0, _actions.handleSubmit)(values, grid, rowData, editRoute));
        },
        onSubmitFail: function onSubmitFail(errors, dispatch, submitError, props) {
            if (submitError.status === 422) {
                var error = {
                    status: 422,
                    response: {
                        body: {
                            name: 'Die Angaben des Formulars enthalten schwerwiegende Fehler.',
                            message: []
                        }
                    }
                };
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = submitError.response.body[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var errorMessage = _step.value;

                        error.response.body.message.push(errorMessage.message);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                dispatch(_wikomData.actions.loadDataFailure({ error: error }));
            }
        },
        onFocus: onFocus,
        onBlur: onBlur,
        submitStatus: submitStatus,
        cellInEdit: cellInEdit,
        wrapperClass: wrapperClass,
        disabled: submitStatus === _constants.SUBMIT_STATUS_PENDING,
        enableReintialize: true
    });
};

EditContainer.propTypes = {
    idx: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    rowData: _propTypes2.default.object,
    component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
    grid: _propTypes2.default.string,
    rowId: _propTypes2.default.number,
    colId: _propTypes2.default.number,
    editRoute: _propTypes2.default.string.isRequired,
    onFocus: _propTypes2.default.func.isRequired
};

exports.default = EditContainer;