'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mapState = undefined;

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _DetailFilterComponent = require('./DetailFilterComponent');

var _DetailFilterComponent2 = _interopRequireDefault(_DetailFilterComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapState = exports.mapState = function mapState(_ref) {
    var search = _ref.routing.location.search;
    return {
        withDetailFilter: _queryString2.default.parse(search).withDetailFilter === '1'
    };
};

var DetailFilterContainer = (0, _reactRedux.connect)(mapState)(_DetailFilterComponent2.default);

DetailFilterContainer.defaultProps = {
    className: 'col-sm-6 col-md-4 col-lg-3 form-group filter-element'
};

DetailFilterContainer.propTypes = {
    name: _propTypes2.default.string.isRequired,
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    grid: _propTypes2.default.string
};

exports.default = DetailFilterContainer;