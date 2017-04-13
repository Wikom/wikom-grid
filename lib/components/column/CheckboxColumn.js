'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _findInObject = require('find-in-object');

var _findInObject2 = _interopRequireDefault(_findInObject);

var _BaseColumn = require('./BaseColumn');

var _BaseColumn2 = _interopRequireDefault(_BaseColumn);

var _actions = require('../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by rouven on 22.03.17.
                                                                                                                                                                                                                              */

var CheckboxColumn = function CheckboxColumn(_ref) {
    var rowData = _ref.rowData,
        idx = _ref.idx,
        checked = _ref.checked,
        onChange = _ref.onChange,
        rest = _objectWithoutProperties(_ref, ['rowData', 'idx', 'checked', 'onChange']);

    return _react2.default.createElement(
        _BaseColumn2.default,
        _extends({}, rest, { className: 'text-center' }),
        _react2.default.createElement('input', {
            type: 'checkbox',
            name: 'row-is-selected',
            value: (0, _findInObject2.default)(idx, rowData),
            checked: checked,
            onChange: onChange
        })
    );
};

CheckboxColumn.defaultProps = {
    checked: false
};

CheckboxColumn.propTypes = {
    rowData: _propTypes2.default.object,
    idx: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    checked: _propTypes2.default.bool
};

var mapStateToProps = function mapStateToProps(state, _ref2) {
    var grid = _ref2.grid,
        idx = _ref2.idx,
        rowData = _ref2.rowData;
    return {
        checked: state.grid[grid] && state.grid[grid].selection && state.grid[grid].selection.indexOf((0, _findInObject2.default)(idx, rowData)) !== -1
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref3) {
    var grid = _ref3.grid;
    return {
        onChange: function onChange(evt) {
            return dispatch((0, _actions.changeSelection)(grid, evt.target));
        }
    };
};

var CheckboxColumnContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CheckboxColumn);

var CheckboxHeader = function CheckboxHeader(_ref4) {
    var grid = _ref4.grid,
        checked = _ref4.checked,
        onChange = _ref4.onChange,
        allValues = _ref4.allValues;
    return _react2.default.createElement(
        'th',
        { className: 'text-center' },
        _react2.default.createElement('input', {
            type: 'checkbox',
            name: 'row-is-selected',
            value: allValues,
            checked: checked,
            onChange: onChange
        })
    );
};

CheckboxHeader.defaultProps = {
    checked: false
};

var mapStateToHeaderProps = function mapStateToHeaderProps(state, _ref5) {
    var grid = _ref5.grid,
        idx = _ref5.idx;
    return {
        allValues: state.grid[grid] && state.grid[grid].data ? JSON.stringify(state.grid[grid].data.map(function (value) {
            return value[idx];
        })) : '',
        checked: (state.grid[grid] && state.grid[grid].data && state.grid[grid].data.length > 0 && state.grid[grid].data.length === state.grid[grid].selection.length) === true
    };
};

var mapDispatchToHeaderProps = function mapDispatchToHeaderProps(dispatch, _ref6) {
    var grid = _ref6.grid;
    return {
        onChange: function onChange(evt) {
            return dispatch((0, _actions.changeSelection)(grid, evt.target));
        }
    };
};

CheckboxColumnContainer.defaultProps = {
    idx: 'id',
    ThComponent: (0, _reactRedux.connect)(mapStateToHeaderProps, mapDispatchToHeaderProps)(CheckboxHeader)
};

exports.default = CheckboxColumnContainer;