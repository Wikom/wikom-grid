'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Created by marvin.ruppelt on 20.09.17.
                                                                                                                                                                                                                                                                               */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fieldStatus = require('../../constants/fieldStatus');

var fieldStatus = _interopRequireWildcard(_fieldStatus);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseEditColumn = function BaseEditColumn(_ref) {
    var className = _ref.className,
        children = _ref.children,
        status = _ref.status;

    var tdClassName = '';
    var ajaxWrapperClassName = 'ajaxsubmit-wrapper';

    switch (typeof className === 'undefined' ? 'undefined' : _typeof(className)) {
        case 'object':
            if (className.td) {
                tdClassName = className.td;
            }
            break;
        case 'string':
            tdClassName = className;
            break;
    }

    switch (status) {
        case fieldStatus.STATUS_ERROR:
            ajaxWrapperClassName += ' ajaxsubmit-error';
            break;
        case fieldStatus.STATUS_INSUBMISSION:
            ajaxWrapperClassName += ' ajaxsubmit-loading';
            break;
        case fieldStatus.STATUS_SAVED:
            ajaxWrapperClassName += ' ajaxsubmit-success';
            break;
    }

    return _react2.default.createElement(
        'td',
        { className: tdClassName },
        _react2.default.createElement(
            'div',
            { className: ajaxWrapperClassName },
            children
        )
    );
};

BaseEditColumn.propTypes = {
    className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
    children: _propTypes2.default.node
};

exports.default = BaseEditColumn;