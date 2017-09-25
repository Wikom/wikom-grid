'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _BoolColumn = require('../BoolColumn');

var _BoolColumn2 = _interopRequireDefault(_BoolColumn);

var _reduxMockStore = require('redux-mock-store');

var _reduxMockStore2 = _interopRequireDefault(_reduxMockStore);

var _reactSymbol = require('react-symbol');

var _reactSymbol2 = _interopRequireDefault(_reactSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var trueString = 'ja'; /**
                        * Created by marvin.ruppelt on 22.09.17.
                        */

var falseString = 'nein';
var trueSymbol = (0, _enzyme.mount)(_react2.default.createElement(_reactSymbol2.default, { symbol: { symbol: "check", className: "text-success" } }));
var falseSymbol = (0, _enzyme.mount)(_react2.default.createElement(_reactSymbol2.default, { symbol: { symbol: "times", className: "text-danger" } }));

describe('components', function () {
    describe('BoolColumn', function () {
        it('should render boolean from string ("true", "false")', function () {
            var falseRowData = {
                id: 1,
                foo: 'false'
            };

            var falseCol = (0, _enzyme.mount)(_react2.default.createElement(
                'table',
                null,
                _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(_BoolColumn2.default, { name: '', rowData: falseRowData, idx: 'foo', type: 'string' })
                    )
                )
            ));
            expect(falseCol.find('td').text()).toBe(falseString);

            var trueRowData = {
                id: 1,
                foo: 'true'
            };

            var trueCol = (0, _enzyme.mount)(_react2.default.createElement(
                'table',
                null,
                _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(_BoolColumn2.default, { name: '', rowData: trueRowData, idx: 'foo', type: 'string' })
                    )
                )
            ));
            expect(trueCol.find('td').text()).toBe(trueString);
        });

        it('should render boolean from bool (true, false)', function () {
            var falseRowData = {
                id: 1,
                foo: false
            };

            var falseCol = (0, _enzyme.mount)(_react2.default.createElement(
                'table',
                null,
                _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(_BoolColumn2.default, { name: '', rowData: falseRowData, idx: 'foo', type: 'string' })
                    )
                )
            ));
            expect(falseCol.find('td').text()).toBe(falseString);

            var trueRowData = {
                id: 1,
                foo: true
            };

            var trueCol = (0, _enzyme.mount)(_react2.default.createElement(
                'table',
                null,
                _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(_BoolColumn2.default, { name: '', rowData: trueRowData, idx: 'foo', type: 'string' })
                    )
                )
            ));
            expect(trueCol.find('td').text()).toBe(trueString);
        });

        it('should render boolean from int (0, 1)', function () {
            var falseRowData = {
                id: 1,
                foo: 0
            };

            var falseCol = (0, _enzyme.mount)(_react2.default.createElement(
                'table',
                null,
                _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(_BoolColumn2.default, { name: '', rowData: falseRowData, idx: 'foo', type: 'string' })
                    )
                )
            ));
            expect(falseCol.find('td').text()).toBe(falseString);

            var trueRowData = {
                id: 1,
                foo: 1
            };

            var trueCol = (0, _enzyme.mount)(_react2.default.createElement(
                'table',
                null,
                _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(_BoolColumn2.default, { name: '', rowData: trueRowData, idx: 'foo', type: 'string' })
                    )
                )
            ));
            expect(trueCol.find('td').text()).toBe(trueString);
        });

        it('should render boolean from string ("n", "j")', function () {
            var falseRowData = {
                id: 1,
                foo: 'n'
            };

            var falseCol = (0, _enzyme.mount)(_react2.default.createElement(
                'table',
                null,
                _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(_BoolColumn2.default, { name: '', rowData: falseRowData, idx: 'foo', type: 'string' })
                    )
                )
            ));
            expect(falseCol.find('td').text()).toBe(falseString);

            var trueRowData = {
                id: 1,
                foo: 'j'
            };

            var trueCol = (0, _enzyme.mount)(_react2.default.createElement(
                'table',
                null,
                _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(_BoolColumn2.default, { name: '', rowData: trueRowData, idx: 'foo', type: 'string' })
                    )
                )
            ));
            expect(trueCol.find('td').text()).toBe(trueString);
        });

        it('should render symbol boolean', function () {
            var falseRowData = {
                id: 1,
                foo: 'n'
            };

            var falseCol = (0, _enzyme.mount)(_react2.default.createElement(
                'table',
                null,
                _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(_BoolColumn2.default, { name: '', rowData: falseRowData, idx: 'foo' })
                    )
                )
            ));
            expect(falseCol.find('td').find('i').html()).toBe(falseSymbol.html());

            var trueRowData = {
                id: 1,
                foo: 'j'
            };

            var trueCol = (0, _enzyme.mount)(_react2.default.createElement(
                'table',
                null,
                _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(_BoolColumn2.default, { name: '', rowData: trueRowData, idx: 'foo' })
                    )
                )
            ));
            expect(trueCol.find('td').find('i').html()).toBe(trueSymbol.html());
        });
    });
});