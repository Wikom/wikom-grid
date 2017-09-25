'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Column = require('../Column');

var _Column2 = _interopRequireDefault(_Column);

var _reduxMockStore = require('redux-mock-store');

var _reduxMockStore2 = _interopRequireDefault(_reduxMockStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by marvin.ruppelt on 22.09.17.
 */

describe('components', function () {
    describe('Column', function () {
        it('should render column with text', function () {
            var rowData = {
                id: 1,
                foo: 'bar'
            };

            var col = (0, _enzyme.mount)(_react2.default.createElement(
                'table',
                null,
                _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(_Column2.default, { name: '', rowData: rowData, idx: 'foo' })
                    )
                )
            ));

            expect(col.text()).toBe('bar');
        });
    });
});