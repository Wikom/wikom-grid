"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by rouven on 29.03.17.
 */
var _default = {
  currentPage: _propTypes["default"].number,
  pageCount: _propTypes["default"].number,
  perPage: _propTypes["default"].number,
  totalCount: _propTypes["default"].number
};
exports["default"] = _default;