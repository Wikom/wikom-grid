'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var _reduxForm = require('redux-form');

var _reactSymbol = require('react-symbol');

var _reactSymbol2 = _interopRequireDefault(_reactSymbol);

var _Filter = require('./Filter');

var _Filter2 = _interopRequireDefault(_Filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by rouven on 17.03.17.
                                                                                                                                                                                                                              */

var GridFilter = function GridFilter(_ref) {
    var handleSubmit = _ref.handleSubmit,
        onSubmit = _ref.onSubmit,
        clearFilter = _ref.clearFilter,
        children = _ref.children,
        rest = _objectWithoutProperties(_ref, ['handleSubmit', 'onSubmit', 'clearFilter', 'children']);

    return _react2.default.createElement(
        'form',
        { onSubmit: handleSubmit(onSubmit) },
        children instanceof Array && children.length > 0 ? _react2.default.createElement(
            'div',
            { className: 'box box-default box-solid grid-search' },
            _react2.default.createElement(
                'div',
                { className: 'box-header with-border' },
                _react2.default.createElement(
                    'h3',
                    { className: 'box-title' },
                    'Filter'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'box-tools pull-right' },
                    _react2.default.createElement(
                        'button',
                        { type: 'button', onClick: clearFilter,
                            className: 'btn btn-xs btn-default btn-filterReset' },
                        _react2.default.createElement(_reactSymbol2.default, { symbol: 'undo' }),
                        ' Filter zur\xFCcksetzen'
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'box-body' },
                _react2.default.createElement(
                    'div',
                    { id: 'filter_row', className: 'row' },
                    children
                ),
                _react2.default.createElement(
                    'div',
                    { id: 'filter_apply_row', className: 'filterapply-wrapper' },
                    _react2.default.createElement(
                        'button',
                        { type: 'submit', className: 'btn btn-sm btn-primary' },
                        _react2.default.createElement(_reactSymbol2.default, { symbol: 'filter' }),
                        'Filter anwenden'
                    )
                )
            )
        ) : ""
    );
};

var FilterForm = (0, _reduxForm.reduxForm)({
    enableReinitialize: true
})(GridFilter);

var mapStateToProps = function mapStateToProps(state, props) {
    return {
        form: props.grid + 'Filter',
        initialValues: Object.assign({}, props.initialValues, state.grid[props.grid] && state.grid[props.grid].filter),
        children: _react2.default.Children.map(props.children, function (child) {
            if (_react2.default.isValidElement(child) && child.type === _Filter2.default && state.grid[props.grid] && state.grid[props.grid].filter[child.props.name]) {
                return _react2.default.cloneElement(child, { className: child.props.className + ' filter_active' });
            } else {
                return child;
            }
        })
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, props) {
    return {
        onSubmit: function onSubmit(data) {
            return dispatch((0, _actions.applyFilter)(data, props.grid));
        },
        clearFilter: function clearFilter() {
            return dispatch((0, _actions.applyFilter)(null, props.grid));
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FilterForm);