import React from 'react'
import {shallow} from 'enzyme'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import ConnectedGridComponent from '../ConnectedGridComponent'
import ConnectedGridContainer from '../ConnectedGridContainer'
import queryString from 'query-string'
import {CALL_HISTORY_METHOD} from 'react-router-redux'

const setup = storeData => {
    const mockStore = configureStore([thunk])(storeData);
    return {
        mockStore
    }
};

const gridProp = (grid, prop) =>
    grid.find(ConnectedGridComponent).props()[prop];

describe('components', () => {
    describe('ConnectedGridContainer', () => {
        const baseUrl = 'http://www.foo.bar';
        const gridName = 'test_grid';

        it('should connect a Connected grid Container to the store', () => {
            const {mockStore} = setup({
                grid: {
                    [gridName]: {}
                },
            });

            const grid = shallow(
                <ConnectedGridContainer
                    store={mockStore}
                    grid={gridName}
                    baseUrl={baseUrl}
                    force={false}
                >
                    <div>INNER</div>
                </ConnectedGridContainer>
            );

            expect(gridProp(grid, 'grid')).toBe(gridName);
            expect(gridProp(grid, 'url')).toBe(baseUrl);
        });

        it('should connect a Connected grid Container to the store with no grid data present', () => {
            const {mockStore} = setup({
                grid: {},
            });

            const grid = shallow(
                <ConnectedGridContainer
                    store={mockStore}
                    grid={gridName}
                    baseUrl={baseUrl}
                    force={false}
                >
                    <div>INNER</div>
                </ConnectedGridContainer>
            );

            expect(gridProp(grid, 'grid')).toBe(gridName);
            expect(gridProp(grid, 'url')).toBe(baseUrl);
        });

        it('should use filter, pagination and sorting from store for grid url', () => {
            const {mockStore} = setup({
                grid: {
                    [gridName]: {
                        filter: {
                            foo: 'bar'
                        },
                        pagination: {
                            pageSize: 10,
                            currentPage: 1
                        },
                        sort: 'foo'
                    }
                },
            });

            const grid = shallow(
                <ConnectedGridContainer
                    store={mockStore}
                    grid={gridName}
                    baseUrl={baseUrl}
                    force={false}
                >
                    <div>INNER</div>
                </ConnectedGridContainer>
            );

            const expectedUrl = baseUrl + '?' +
                queryString.stringify({
                    'filter[foo]': 'bar',
                    'per-page': 10,
                    page: 1,
                    sort: 'foo'
                });

            expect(gridProp(grid, 'grid')).toBe(gridName);
            expect(gridProp(grid, 'url')).toBe(expectedUrl);
        });

        it('should dispatch a changeSort action', () => {
            const {mockStore} = setup({
                grid: {
                    [gridName]: {
                        filter: {
                            foo: 'bar'
                        },
                        pagination: {
                            pageSize: 10,
                            currentPage: 1
                        },
                        sort: 'foo'
                    }
                },
                routing: {
                    location: 'http://www.foo.bar'
                }
            });

            const grid = shallow(
                <ConnectedGridContainer
                    store={mockStore}
                    grid={gridName}
                    baseUrl={baseUrl}
                    force={false}
                >
                    <div>INNER</div>
                </ConnectedGridContainer>
            );

            gridProp(grid, 'handleSort')('foo', false);

            const expectedSearchString = queryString.stringify({
                grid: JSON.stringify({
                    [gridName]: {
                        sort: '-foo'
                    }
                })
            });

            expect(mockStore.getActions().length).toBe(1);
            expect(mockStore.getActions()[0].type).toBe(CALL_HISTORY_METHOD);
            expect(mockStore.getActions()[0].payload.args[0].search).toBe(expectedSearchString);
        });

    });
});