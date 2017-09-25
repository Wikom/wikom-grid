'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actionTypes = require('../../actions/actionTypes');

var types = _interopRequireWildcard(_actionTypes);

var _enzyme = require('enzyme');

var _index = require('../../index');

var _reduxMockStore = require('redux-mock-store');

var _reduxMockStore2 = _interopRequireDefault(_reduxMockStore);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setupStore(storeData) {
    var mockStore = (0, _reduxMockStore2.default)()(storeData);
    return {
        mockStore: mockStore
    };
} /**
   * Created by marvin.ruppelt on 21.09.17.
   */

describe('components', function () {
    describe('Grid', function () {
        it('should render loading state ', function () {
            var _setupStore = setupStore({}),
                mockStore = _setupStore.mockStore;

            var page = (0, _enzyme.mount)(_react2.default.createElement(_index.Grid, { store: mockStore, isLoading: true, grid: 'test' }));

            expect(page.find('tr').find('.pageWaiter-note').length).toBe(1);
        });

        it('display "no results"-message on empty data', function () {
            var _setupStore2 = setupStore({}),
                mockStore = _setupStore2.mockStore;

            var page = (0, _enzyme.mount)(_react2.default.createElement(
                _index.Grid,
                { store: mockStore, isLoading: false, grid: 'test' },
                _react2.default.createElement(
                    _index.Columns,
                    null,
                    _react2.default.createElement(_index.Column, { name: 'Test 01', idx: 'test01' }),
                    _react2.default.createElement(_index.Column, { name: 'Test 02', idx: 'test02' })
                )
            ));

            expect(page.find('tbody').find('td').text()).toBe('Keine Ergebnisse vorhanden');
        });

        it('three data entrys sould result in three tbody rows', function () {
            var _setupStore3 = setupStore({}),
                mockStore = _setupStore3.mockStore;

            var data = [{ test01: 'foo', test02: 'bar' }, { test01: 'foo', test02: 'bar' }, { test01: 'foo', test02: 'bar' }];

            var page = (0, _enzyme.mount)(_react2.default.createElement(
                _index.Grid,
                { store: mockStore, isLoading: false, data: data, grid: 'test' },
                _react2.default.createElement(
                    _index.Columns,
                    null,
                    _react2.default.createElement(_index.Column, { name: 'Test 01', idx: 'test01' }),
                    _react2.default.createElement(_index.Column, { name: 'Test 02', idx: 'test02' })
                )
            ));

            expect(page.find('tbody').find('tr').length).toBe(3);
        });

        it('className for table?', function () {
            var _setupStore4 = setupStore({}),
                mockStore = _setupStore4.mockStore;

            var className = 'foobar';

            var page = (0, _enzyme.mount)(_react2.default.createElement(
                _index.Grid,
                { store: mockStore, isLoading: false, grid: 'test', className: className },
                _react2.default.createElement(
                    _index.Columns,
                    null,
                    _react2.default.createElement(_index.Column, { name: 'Test 01', idx: 'test01' }),
                    _react2.default.createElement(_index.Column, { name: 'Test 02', idx: 'test02' })
                )
            ));

            expect(page.find('table').hasClass(className)).toBe(true);
        });
    });
});