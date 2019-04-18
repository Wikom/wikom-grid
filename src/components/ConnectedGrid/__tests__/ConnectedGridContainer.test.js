import React from 'react'
import {shallow, mount} from 'enzyme'
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
                queries: {},
                grid: {
                    [gridName]: {}
                },
            });

            /**
             * shallow mounting von "connect"-Komponenten mit React 16.8 zur Zeit nicht möglich
             * @todo Nach update der Test-Umgebung zurück ändern!
             */

            // const grid = shallow(
            //     <ConnectedGridContainer
            //         store={mockStore}
            //         grid={gridName}
            //         baseUrl={baseUrl}
            //         force={false}
            //     >
            //         <div>INNER</div>
            //     </ConnectedGridContainer>
            // );
            const grid = mount(
                <ConnectedGridContainer
                    store={mockStore}
                    grid={gridName}
                    baseUrl={baseUrl}
                    force={false}
                />
            );

            expect(gridProp(grid, 'grid')).toBe(gridName);
            expect(gridProp(grid, 'url')).toBe(baseUrl);
        });

        it('should connect a Connected grid Container to the store with no grid data present', () => {
            const {mockStore} = setup({
                queries: {},
                grid: {},
            });

            // const grid = shallow(
            //     <ConnectedGridContainer
            //         store={mockStore}
            //         grid={gridName}
            //         baseUrl={baseUrl}
            //         force={false}
            //     >
            //         <div>INNER</div>
            //     </ConnectedGridContainer>
            // );
            const grid = mount(
                <ConnectedGridContainer
                    store={mockStore}
                    grid={gridName}
                    baseUrl={baseUrl}
                    force={false}
                />
            );

            expect(gridProp(grid, 'grid')).toBe(gridName);
            expect(gridProp(grid, 'url')).toBe(baseUrl);
        });

        it('should use filter, pagination and sorting from store for grid url', () => {
            const {mockStore} = setup({
                queries: {},
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

            // const grid = shallow(
            //     <ConnectedGridContainer
            //         store={mockStore}
            //         grid={gridName}
            //         baseUrl={baseUrl}
            //         force={false}
            //     >
            //         <div>INNER</div>
            //     </ConnectedGridContainer>
            // );
            const grid = mount(
                <ConnectedGridContainer
                    store={mockStore}
                    grid={gridName}
                    baseUrl={baseUrl}
                    force={false}
                />
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

        it('should append grid params with amp if grid url contains question mark', () => {
            const {mockStore} = setup({
                queries: {},
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
            const otherBaseUrl = baseUrl + '?foo=bar';

            // const grid = shallow(
            //     <ConnectedGridContainer
            //         store={mockStore}
            //         grid={gridName}
            //         baseUrl={otherBaseUrl}
            //         force={false}
            //     >
            //         <div>INNER</div>
            //     </ConnectedGridContainer>
            // );
            const grid = mount(
                <ConnectedGridContainer
                    store={mockStore}
                    grid={gridName}
                    baseUrl={otherBaseUrl}
                    force={false}
                />
            );

            const expectedUrl = otherBaseUrl + '&' +
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
                queries: {},
                routing: {
                    location: 'http://localhost'
                }
            });

            // const grid = shallow(
            //     <ConnectedGridContainer
            //         store={mockStore}
            //         grid={gridName}
            //         baseUrl={baseUrl}
            //         force={false}
            //     >
            //         <div>INNER</div>
            //     </ConnectedGridContainer>
            // );
            const grid = mount(
                <ConnectedGridContainer
                    store={mockStore}
                    grid={gridName}
                    baseUrl={baseUrl}
                    force={false}
                />
            );

            gridProp(grid, 'handleSort')('foo', false);

            const expectedSearchString = queryString.stringify({
                grid: JSON.stringify({
                    [gridName]: {
                        sort: '-foo'
                    }
                })
            });

            expect(mockStore.getActions().length).toBe(2);
            expect(mockStore.getActions()[1].type).toBe(CALL_HISTORY_METHOD);
            expect(mockStore.getActions()[1].payload.args[0].search).toBe(expectedSearchString);
        });

    });
});