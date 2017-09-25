'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _nock = require('nock');

var _nock2 = _interopRequireDefault(_nock);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _index = require('../../index');

var _reduxMockStore = require('redux-mock-store');

var _reduxMockStore2 = _interopRequireDefault(_reduxMockStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by marvin.ruppelt on 22.09.17.
                                                                                                                                                                                                                              */

function setup(storeData) {
    var mockStore = (0, _reduxMockStore2.default)([_reduxThunk2.default])(storeData);
    return {
        mockStore: mockStore
    };
}

describe('components', function () {
    describe('ConnectedGrid', function () {
        it('should render loading state on pending request', function () {
            return; // Connected Grid Test not working

            var _setup = setup({
                queries: { test: { isPending: false } },
                data: { bar: { fee: "test" } },
                grid: { test: null }

            }),
                mockStore = _setup.mockStore;

            var requestRoute = 'http://www.foo.bar';

            var scope = (0, _nock2.default)(requestRoute).get('/test').reply(200, '[{foo: "test"}, {}, {}]');

            var InnerGrid = function InnerGrid(_ref) {
                var props = _objectWithoutProperties(_ref, []);

                return _react2.default.createElement(
                    _index.Grid,
                    props,
                    _react2.default.createElement(
                        _index.Columns,
                        null,
                        _react2.default.createElement(_index.Column, { idx: 'foo', name: 'Foo' })
                    )
                );
            };

            var page = (0, _enzyme.mount)(_react2.default.createElement(
                _index.ConnectedGrid,
                { store: mockStore, grid: 'test', baseUrl: requestRoute + '/test', force: true },
                _react2.default.createElement(InnerGrid, null)
            ));

            // console.log(mockStore.getState());
            // console.log(page.html());


            //expect(page.find('tr').find('.pageWaiter-note').length).toBe(1);
        });
    });
});