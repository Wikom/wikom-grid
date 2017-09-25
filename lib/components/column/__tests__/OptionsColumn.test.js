'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _OptionsColumn = require('../OptionsColumn');

var _OptionsColumn2 = _interopRequireDefault(_OptionsColumn);

var _reduxMockStore = require('redux-mock-store');

var _reduxMockStore2 = _interopRequireDefault(_reduxMockStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by marvin.ruppelt on 22.09.17.
 */

describe('components', function () {
    describe('OptionsColumn', function () {
        it('should render column option', function () {
            var rowData = {
                id: 1,
                foo: 'bar'
            };

            var options = {
                bar: 'barbar'
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
                        _react2.default.createElement(_OptionsColumn2.default, { name: '', rowData: rowData, idx: 'foo', options: options })
                    )
                )
            ));

            expect(col.text()).toBe('barbar');
        });

        it('should render column with no option available', function () {
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
                        _react2.default.createElement(_OptionsColumn2.default, { name: '', rowData: rowData, idx: 'foo', options: {} })
                    )
                )
            ));

            expect(col.text()).toBe('');
        });
    });
});