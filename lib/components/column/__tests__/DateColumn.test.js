'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _DateColumn = require('../DateColumn');

var _DateColumn2 = _interopRequireDefault(_DateColumn);

var _reduxMockStore = require('redux-mock-store');

var _reduxMockStore2 = _interopRequireDefault(_reduxMockStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by marvin.ruppelt on 22.09.17.
 */

describe('components', function () {
    describe('DateColumn', function () {
        it('should render empty when not set', function () {
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
                        _react2.default.createElement(_DateColumn2.default, { name: '', rowData: rowData, idx: 'foo' })
                    )
                )
            ));

            expect(col.text()).toBe('');
        });

        it('should render simple date if not defined otherwise', function () {
            var rowData = {
                id: 1,
                foo: '3.5.2012 23:11'
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
                        _react2.default.createElement(_DateColumn2.default, { name: '', rowData: rowData, idx: 'foo' })
                    )
                )
            ));

            expect(col.text()).toBe('05.03.2012');
        });
    });

    it('should render simple date if not defined otherwise', function () {
        var rowData = {
            id: 1,
            foo: '3.5.2012 23:11'
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
                    _react2.default.createElement(_DateColumn2.default, { name: '', rowData: rowData, idx: 'foo', format: 'DD.MM.YYYY HH:mm' })
                )
            )
        ));

        expect(col.text()).toBe('05.03.2012 23:11');
    });
});