import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import queryString from 'query-string'
import {applyFilter, changePage, changePageSize, changeSort,
    initializeGrid, destroyGrid, initializeFilter, destroyFilter, changeData, changeSelection,
    editStart, editEnd
} from '../'
import * as types from '../actionTypes'
import {LOCATION_CHANGE, CALL_HISTORY_METHOD} from 'react-router-redux'

const name = 'grid_name';

describe('Grid actions', () => {
    describe('Async Grid actions', () => {
        const mockStore = configureMockStore([thunk]);
        const store = mockStore({routing: {location: {pathname: '/foo'}}});
        const checkStore = (search, actionCount = 1, st = store) => {
            const actions = st.getActions();

            // there should be one new dispatched action
            expect(actions.length).toBe(actionCount);

            // that action should be of type LOCATION_CHANGE or CALL_HISTORY_METHOD
            expect([LOCATION_CHANGE, CALL_HISTORY_METHOD]).toContain(actions[actionCount - 1].type);

            // the payload of the action should contain the new search string
            if (actions[actionCount - 1].payload.hasOwnProperty('search')) {
                expect(actions[actionCount - 1].payload.search).toBe(search);
            } else {
                expect(actions[actionCount - 1].payload.args[0].search).toBe(search);
            }
        };

        afterEach(() => store.clearActions());

        it('should apply a grid filter', () => {
            const data = {
                filter_1: 'FOO',
                filter_2: 'BAR'
            };

            const expected = queryString.stringify({
                grid: JSON.stringify({
                    grid_name: {
                        filter: data
                    }
                })
            });

            store.dispatch(applyFilter(data, name));

            checkStore(expected);
        });

        it('should clear previously applied filters', () => {
            const search = queryString.stringify({
                grid: JSON.stringify({
                    grid_name: {
                        filter: {
                            filter_1: 'FOO',
                            filter_2: 'BAR'
                        }
                    }
                })
            });
            const other_store = mockStore({routing: {location: {pathname: '/foo', search}}});

            other_store.dispatch(applyFilter(null, name));

            checkStore('', 1, other_store);
        });

        test('should change page number in pagination', () => {
            const expected = queryString.stringify({
                grid: JSON.stringify({
                    grid_name: {
                        currentPage: 2
                    }
                })
            });

            store.dispatch(changePage(1, name));

            checkStore(expected);
        });

        it('should change page size in pagination', () => {
            const expected = queryString.stringify({
                grid: JSON.stringify({
                    grid_name: {
                        pageSize: 10
                    }
                })
            });

            store.dispatch(changePageSize({target: {value: 10}}, name));

            checkStore(expected);
        });

        it('should change grid sorting', () => {
            const expected = queryString.stringify({
                grid: JSON.stringify({
                    grid_name: {
                        sort: 'row_1'
                    }
                })
            });

            store.dispatch(changeSort(name, 'row_1'));

            checkStore(expected);

            const expected_2 = queryString.stringify({
                grid: JSON.stringify({
                    grid_name: {
                        sort: '-row_2'
                    }
                })
            });

            store.dispatch(changeSort(name, 'row_2', false));

            checkStore(expected_2, 2);
        });

        it('should end editing mode for grid', done => {
            const store = mockStore({grid: {
                [name]: {
                    edit: {
                        rowId: 1,
                        colId: 1
                    }
                }
            }});

            store.dispatch(editEnd(name, 1, 1));

            const check = () => {
                const actions = store.getActions();

                expect(actions.length).toBe(1);
                expect(actions[0].type).toBe(types.EDIT_START);

                done();
            };

            setTimeout(check, 200);
        });

        it('should do nothing if editEnd is fired from cell not in editing mode', done => {
            const store = mockStore({grid: {
                [name]: {
                    edit: {
                        rowId: 1,
                        colId: 1
                    }
                }
            }});

            store.dispatch(editEnd(name, 1, 2));

            const check = () => {
                const actions = store.getActions();

                expect(actions.length).toBe(0);

                done();
            };

            setTimeout(check, 200);
        });

    });

    describe('Sync Grid actions', () => {

        it('should initialize a grid', () => {
            const expected = {
                type: types.INITIALIZE,
                name
            };

            expect(initializeGrid(name)).toEqual(expected);
        });

        it('should destroy a grid', () => {
            const expected = {
                type: types.DESTROY,
                name
            };

            expect(destroyGrid(name)).toEqual(expected);
        });

        it('should initialize a grid filter', () => {
            const expected = {
                type: types.INITIALIZE_FILTER,
                name,
                initialValues: {filter_1: 'value_1'}
            };

            expect(initializeFilter(name, {filter_1: 'value_1'})).toEqual(expected);
        });

        it('should destroy a grid filter', () => {
            const expected = {
                type: types.DESTROY_FILTER,
                name
            };

            expect(destroyFilter(name)).toEqual(expected);
        });

        it('should generate an action object to change grid data', () => {
            const data = [
                {
                    col_1: 1,
                    col_2: 'ROW 1'
                },
                {
                    col_1: 2,
                    col_2: 'ROW 2'
                }
            ];

            const expected = {
                type: types.DATA_CHANGED,
                name,
                data
            };

            expect(changeData(name, data)).toEqual(expected);
        });

        it('should generate an action object to change selection', () => {
            const target = {
                checked: true,
                value: 1
            };

            const expected = {
                type: types.SELECTION_CHANGED,
                name,
                checked: target.checked,
                value: target.value
            };

            expect(changeSelection(name, target)).toEqual(expected);
        });

        it('should set a cell in edit mode', () => {
            const expected = {
                type: types.EDIT_START,
                name,
                rowId: 1,
                colId: 1
            };

            expect(editStart(name, 1, 1)).toEqual(expected);
        });


    });

});