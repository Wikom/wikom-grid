'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _index = require('../../actions/index');

var _reduxForm = require('redux-form');

var _reactSymbol = require('react-symbol');

var _reactSymbol2 = _interopRequireDefault(_reactSymbol);

var _Filter = require('../Filter');

var _Filter2 = _interopRequireDefault(_Filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by rouven on 17.03.17.
                                                                                                                                                                                                                              */

var GridFilterDefaultTemplate = function GridFilterDefaultTemplate(_ref) {
    var clearFilter = _ref.clearFilter,
        children = _ref.children;
    return _react2.default.createElement(
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
    );
};

var GridFilter = function GridFilter(_ref2) {
    var handleSubmit = _ref2.handleSubmit,
        onSubmit = _ref2.onSubmit,
        children = _ref2.children,
        Template = _ref2.Template,
        rest = _objectWithoutProperties(_ref2, ['handleSubmit', 'onSubmit', 'children', 'Template']);

    if (!(children instanceof Array) || !children.length) {
        return null;
    }
    return _react2.default.createElement(
        'form',
        { onSubmit: handleSubmit(onSubmit) },
        _react2.default.createElement(
            Template,
            rest,
            children
        )
    );
};
GridFilter.defaultProps = {
    Template: GridFilterDefaultTemplate
};

var FilterForm = (0, _reduxForm.reduxForm)({
    enableReinitialize: true
})(GridFilter);

var mapStateToProps = function mapStateToProps(state, props) {
    return {
        form: props.grid + 'Filter',
        initialValues: Object.assign({}, props.initialValues || {}, state.grid[props.grid] && state.grid[props.grid].filter),
        children: _react2.default.Children.map(props.children, function (child) {
            if (_react2.default.isValidElement(child) && child.type === _Filter2.default && state.grid[props.grid] && state.grid[props.grid].filter.hasOwnProperty(child.props.name) && state.grid[props.grid].filter[child.props.name] !== null && state.grid[props.grid].filter[child.props.name] !== "") {
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
            return dispatch((0, _index.applyFilter)(data, props.grid));
        },
        clearFilter: function clearFilter() {
            return dispatch((0, _index.applyFilter)(props.initialValues || {}, props.grid));
        }
    };
};

var GridFilterContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FilterForm);

var GridFilterWrapper = function (_React$Component) {
    _inherits(GridFilterWrapper, _React$Component);

    function GridFilterWrapper() {
        _classCallCheck(this, GridFilterWrapper);

        return _possibleConstructorReturn(this, (GridFilterWrapper.__proto__ || Object.getPrototypeOf(GridFilterWrapper)).apply(this, arguments));
    }

    _createClass(GridFilterWrapper, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.initializeFilter();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(GridFilterContainer, this.props);
        }
    }]);

    return GridFilterWrapper;
}(_react2.default.Component);

var mapDispatchForWrapper = function mapDispatchForWrapper(dispatch, props) {
    return {
        initializeFilter: function initializeFilter() {
            return dispatch((0, _index.initializeFilter)(props.grid, props.initialValues));
        }
    };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchForWrapper)(GridFilterWrapper);