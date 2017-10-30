import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import queryString from 'query-string'
import {applyFilter, changePage, changePageSize, changeSort,
    initializeGrid, destroyGrid, initializeFilter, destroyFilter, changeData, changeSelection,
    setNextEditRow, fieldChanged, fieldSaved, fieldInSubmission, fieldSubmissionFailed, submitField
} from '../'
import * as types from '../actionTypes'
import {LOCATION_CHANGE, CALL_HISTORY_METHOD} from 'react-router-redux'
import nock from 'nock'

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

        it('should submit a field value', done => {
            nock('https://localhost/')
                .put('/save/1', {
                    id: 1,
                    name: 'test'
                })
                .reply(200, {data: {id: 1, name: 'test'}});

            store.dispatch(submitField({
                rowData: {id: 1, name: 'old_value'},
                idx: 'name',
                url: 'https://localhost/save',
                value: 'test'
            })).then(result => {
                expect(result.status).toBe(200);
                expect(result.body).toEqual({ data: { id: 1, name: 'test' } });

                done();
            });
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

        it('should set a row in edit mode', () => {
            const expected = {
                type: types.SETNEXTEDITROW,
                name,
                index: 1
            };

            expect(setNextEditRow(name, 1)).toEqual(expected);
        });

        it('should change edit field', () => {
            const expected = {
                type: types.FIELDCHANGED,
                name,
                idx: 'field_1'
            };

            expect(fieldChanged(name, 'field_1')).toEqual(expected);
        });

        it('should mark a field as saved', () => {
            const expected = {
                type: types.FIELDSAVED,
                name,
                idx: 'field_1'
            };

            expect(fieldSaved(name, 'field_1')).toEqual(expected);
        });

        it('should mark a field as in submission', () => {
            const expected = {
                type: types.FIELDINSUBMISSION,
                name,
                idx: 'field_1'
            };

            expect(fieldInSubmission(name, 'field_1')).toEqual(expected);
        });

        it('should mark a field as submission failed', () => {
            const expected = {
                type: types.FIELDSUBMISSIONFAILED,
                name,
                idx: 'field_1'
            };

            expect(fieldSubmissionFailed(name, 'field_1')).toEqual(expected);
        });

    });

});