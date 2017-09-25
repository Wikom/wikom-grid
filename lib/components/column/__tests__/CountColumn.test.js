'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _CountColumn = require('../CountColumn');

var _CountColumn2 = _interopRequireDefault(_CountColumn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('components', function () {
    describe('CountColumn', function () {
        it('count array elements', function () {
            var rowData = {
                id: 1,
                foo: [1, 2, 3, 4, 5, 6]
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
                        _react2.default.createElement(_CountColumn2.default, { name: '', rowData: rowData, idx: 'foo', type: 'string' })
                    )
                )
            ));
            expect(falseCol.find('td').text()).toBe('6');
        });

        it('attribute not set => result sould be 0', function () {
            var rowData = {
                id: 1
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
                        _react2.default.createElement(_CountColumn2.default, { name: '', rowData: rowData, idx: 'foo', type: 'string' })
                    )
                )
            ));
            expect(falseCol.find('td').text()).toBe('0');
        });
    });
}); /**
     * Created by marvin.ruppelt on 22.09.17.
     */