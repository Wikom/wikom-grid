'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _index = require('../../actions/index');

var _GridFilterWrapperComponent = require('./GridFilterWrapperComponent');

var _GridFilterWrapperComponent2 = _interopRequireDefault(_GridFilterWrapperComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDispatchForWrapper = function mapDispatchForWrapper(dispatch, _ref) {
    var grid = _ref.grid,
        initialValues = _ref.initialValues;
    return {
        initializeFilter: function initializeFilter() {
            return dispatch((0, _index.initializeFilter)(grid, initialValues));
        }
    };
};

var GridFilterWrapperContainer = (0, _reactRedux.connect)(null, mapDispatchForWrapper)(_GridFilterWrapperComponent2.default);

GridFilterWrapperContainer.propTypes = {
    grid: _propTypes2.default.string.isRequired,
    initialValues: _propTypes2.default.object
};

exports.default = GridFilterWrapperContainer;