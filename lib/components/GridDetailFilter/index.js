'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _GridFilter2 = require('../GridFilter');

var _GridFilter3 = _interopRequireDefault(_GridFilter2);

var _GridFilterDetailTemplate = require('./GridFilterDetailTemplate');

var _GridFilterDetailTemplate2 = _interopRequireDefault(_GridFilterDetailTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GridDetailFilter = function (_GridFilter) {
    _inherits(GridDetailFilter, _GridFilter);

    function GridDetailFilter() {
        _classCallCheck(this, GridDetailFilter);

        return _possibleConstructorReturn(this, (GridDetailFilter.__proto__ || Object.getPrototypeOf(GridDetailFilter)).apply(this, arguments));
    }

    return GridDetailFilter;
}(_GridFilter3.default);

GridDetailFilter.defaultProps = {
    Template: _GridFilterDetailTemplate2.default
};

exports.default = GridDetailFilter;