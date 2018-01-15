'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _GridFilterDetailTemplateComponent = require('./GridFilterDetailTemplateComponent');

var _GridFilterDetailTemplateComponent2 = _interopRequireDefault(_GridFilterDetailTemplateComponent);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridFilterDetailTemplateContainer = (0, _reactRedux.connect)(_helpers.mapState, _helpers.mapDispatch)(_GridFilterDetailTemplateComponent2.default);

exports.default = GridFilterDetailTemplateContainer;