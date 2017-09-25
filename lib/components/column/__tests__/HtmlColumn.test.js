'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _HtmlColumn = require('../HtmlColumn');

var _HtmlColumn2 = _interopRequireDefault(_HtmlColumn);

var _reduxMockStore = require('redux-mock-store');

var _reduxMockStore2 = _interopRequireDefault(_reduxMockStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by marvin.ruppelt on 22.09.17.
 */

describe('components', function () {
    describe('HtmlColumn', function () {
        it('should render column with HTML text', function () {
            var rowData = {
                id: 1,
                foo: '<b>foo bar</b>'
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
                        _react2.default.createElement(_HtmlColumn2.default, { name: '', rowData: rowData, idx: 'foo' })
                    )
                )
            ));

            expect(col.find('span').text()).toBe('foo bar');
        });

        it('should render column without data text: empty span', function () {
            var rowData = {
                id: 1
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
                        _react2.default.createElement(_HtmlColumn2.default, { name: '', rowData: rowData, idx: 'foo' })
                    )
                )
            ));

            expect(col.find('span').text()).toBe('');
        });
    });
});