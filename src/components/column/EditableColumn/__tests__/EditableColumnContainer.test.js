import React from 'react'
import {mount} from 'enzyme'
import thunk from 'redux-thunk'
import EditableColumnContainer from '../EditableColumnContainer'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import EditableColumnComponent from '../EditableColumnComponent'
import {SUBMIT_STATUS_SUCCESS} from '../../../../constants'
import {EDIT_START} from '../../../../actions/actionTypes'

const setupStore = storeData => {
    return configureStore()(storeData);
};

describe('components', () => {
    describe('EditableColumnContainer', () => {
        it('should render a editable column not in edit mode', () => {
            const store = setupStore({
                grid: {
                    test_grid: {
                        edit: {
                            rowId: null,
                            colId: null,
                            status: {},
                            values: {},
                            tmp: {}
                        }
                    }
                }
            });
            const rowData = {
                test: 'foo'
            };

            const table = mount(
                <Provider store={store}>
                    <table>
                        <tbody>
                        <tr>
                            <EditableColumnContainer
                                grid="test_grid"
                                name="TEST"
                                rowId={1}
                                colId={1}
                                rowData={rowData}
                                idx="test"
                            />
                        </tr>
                        </tbody>
                    </table>
                </Provider>
            );

            expect(table.find(EditableColumnComponent).prop('rowInEdit')).toBe(false);
            expect(table.find(EditableColumnComponent).prop('cellInEdit')).toBe(false);
            expect(table.find(EditableColumnComponent).prop('submitStatus')).toBe(null);
            expect(table.find(EditableColumnComponent).prop('changedRowData')).toBe(null);
            expect(table.find(EditableColumnComponent).prop('hasValueChanged')).toBe(false);
        });

        it('should render a editable column in edit mode', () => {
            const store = setupStore({
                grid: {
                    test_grid: {
                        edit: {
                            rowId: 0,
                            colId: 0,
                            status: {},
                            values: {},
                            tmp: {}
                        }
                    }
                }
            });
            const rowData = {
                test: 'foo'
            };

            const table = mount(
                <Provider store={store}>
                    <table>
                        <tbody>
                        <tr>
                            <EditableColumnContainer
                                grid="test_grid"
                                name="TEST"
                                rowId={0}
                                colId={0}
                                rowData={rowData}
                                idx="test"
                                editRoute="http://localhost"
                            />
                        </tr>
                        </tbody>
                    </table>
                </Provider>
            );

            expect(table.find(EditableColumnComponent).prop('rowInEdit')).toBe(true);
            expect(table.find(EditableColumnComponent).prop('cellInEdit')).toBe(true);
            expect(table.find(EditableColumnComponent).prop('submitStatus')).toBe(null);
            expect(table.find(EditableColumnComponent).prop('changedRowData')).toBe(null);
            expect(table.find(EditableColumnComponent).prop('hasValueChanged')).toBe(false);
        });

        it('should render a editable column with submit status success and changed data', () => {
            const store = setupStore({
                grid: {
                    test_grid: {
                        edit: {
                            rowId: 0,
                            colId: 0,
                            status: {
                                0: {
                                    0: SUBMIT_STATUS_SUCCESS
                                }
                            },
                            values: {
                                0: {
                                    0: 'bar'
                                }
                            },
                            tmp: {}
                        }
                    }
                }
            });
            const rowData = {
                test: 'foo'
            };

            const table = mount(
                <Provider store={store}>
                    <table>
                        <tbody>
                        <tr>
                            <EditableColumnContainer
                                grid="test_grid"
                                name="TEST"
                                rowId={0}
                                colId={0}
                                rowData={rowData}
                                idx="test"
                                editRoute="http://localhost"
                            />
                        </tr>
                        </tbody>
                    </table>
                </Provider>
            );

            expect(table.find(EditableColumnComponent).prop('rowInEdit')).toBe(true);
            expect(table.find(EditableColumnComponent).prop('cellInEdit')).toBe(true);
            expect(table.find(EditableColumnComponent).prop('submitStatus')).toEqual(SUBMIT_STATUS_SUCCESS);
            expect(table.find(EditableColumnComponent).prop('changedRowData')).toEqual({test: 'bar'});
            expect(table.find(EditableColumnComponent).prop('hasValueChanged')).toBe(true);
        });

        it('should dispatch click action', () => {
            const store = configureStore([thunk])({
                grid: {
                    test_grid: {
                        edit: {
                            rowId: null,
                            colId: null,
                            status: {},
                            values: {},
                            tmp: {}
                        }
                    }
                }
            });
            const rowData = {
                test: 'foo'
            };

            const table = mount(
                <Provider store={store}>
                    <table>
                        <tbody>
                        <tr>
                            <EditableColumnContainer
                                grid="test_grid"
                                name="TEST"
                                rowId={0}
                                colId={0}
                                rowData={rowData}
                                idx="test"
                                editRoute="http://localhost"
                            />
                        </tr>
                        </tbody>
                    </table>
                </Provider>
            );

            table.find(EditableColumnComponent).prop('onClick')();

            expect(store.getActions().length).toBe(1);
            expect(store.getActions()[0].type).toEqual(EDIT_START);
            expect(store.getActions()[0].name).toEqual('test_grid');
            expect(store.getActions()[0].rowId).toEqual(0);
            expect(store.getActions()[0].colId).toEqual(0);
        });

        it('should dispatch blur action', done => {
            const store = configureStore([thunk])({
                grid: {
                    test_grid: {
                        edit: {
                            rowId: 0,
                            colId: 0,
                            status: {},
                            values: {},
                            tmp: {}
                        }
                    }
                }
            });
            const rowData = {
                test: 'foo'
            };

            const table = mount(
                <Provider store={store}>
                    <table>
                        <tbody>
                        <tr>
                            <EditableColumnContainer
                                grid="test_grid"
                                name="TEST"
                                rowId={0}
                                colId={0}
                                rowData={rowData}
                                idx="test"
                                editRoute="http://localhost"
                            />
                        </tr>
                        </tbody>
                    </table>
                </Provider>
            );

            table.find(EditableColumnComponent).prop('onBlur')();

            const check = () => {
                expect(store.getActions().length).toBe(3);
                expect(store.getActions()[2].type).toEqual(EDIT_START);
                expect(store.getActions()[2].name).toEqual('test_grid');
                expect(store.getActions()[2].rowId).toEqual(null);
                expect(store.getActions()[2].colId).toEqual(null);

                done();
            };

            setTimeout(check, 200);
        });

    });
});