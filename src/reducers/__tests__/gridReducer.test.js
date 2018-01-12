import reducer from '../gridReducer'
import * as types from '../../actions/actionTypes'
import {LOCATION_CHANGE} from 'react-router-redux'
import {actionTypes as formActions} from 'redux-form'
import queryString from 'query-string'
import {EDIT_START} from "../../actions/actionTypes";
import {SUBMIT_STATUS_SUCCESS, SUBMIT_STATUS_PENDING, SUBMIT_STATUS_FAILURE} from '../../constants'

const gridName = 'test';
let initializedGridState = reducer(undefined, {
    type: types.INITIALIZE,
    name: gridName
});

describe('grid reducer', () => {
    afterEach(() => {
        initializedGridState = reducer(undefined, {
            type: types.INITIALIZE,
            name: gridName
        });
    });

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    });

    it('should handle INITIALIZE', () => {
        expect(initializedGridState).toEqual({
            [gridName]: {
                data: [],
                filter: {},
                pagination: {},
                selection: [],
                sort: null,
                edit: {
                    colId: null,
                    rowId: null,
                    status: {},
                    tmp: {},
                    values: {}
                }
            }
        });

        // do not initialize multiple times
        expect(reducer(initializedGridState, {
            type: types.INITIALIZE,
            name: gridName
        })).toEqual(initializedGridState);

    });

    it('should handle DESTROY', () => {
        const destroyAction = {
            type: types.DESTROY,
            name: gridName
        };

        expect(reducer(undefined, destroyAction)).toEqual({});
        expect(reducer(initializedGridState, destroyAction)).toEqual({});
    });

    it('should handle LOCATION_CHANGE without grid data and default filter', () => {
        expect(reducer(initializedGridState, {
            type: LOCATION_CHANGE,
            payload: {}
        })).toEqual(initializedGridState);
    });

    it('should handle INITIALIZE_FILTER', () => {
        expect(reducer(initializedGridState, {
            type: types.INITIALIZE_FILTER,
            name: gridName,
            initialValues: {
                foo: 'bar'
            }
        })).toEqual(initializedGridState);

        expect(reducer(initializedGridState, {
            type: types.INITIALIZE_FILTER,
            name: gridName
        })).toEqual(initializedGridState);
    });

    it('should handle LOCATION_CHANGE without grid data', () => {
        expect(reducer(initializedGridState, {
            type: LOCATION_CHANGE,
            payload: {}
        })).toEqual(initializedGridState);
    });

    it('should handle LOCATION_CHANGE with grid data', () => {
        const searchString = queryString.stringify({
            grid: JSON.stringify({
                [gridName]: {
                    filter: {
                        foo: 'bar'
                    }
                }
            })
        });

        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].filter = {
            foo: 'bar'
        };

        expect(reducer(initializedGridState, {
            type: LOCATION_CHANGE,
            payload: {
                search: searchString
            }
        })).toEqual(expectedGridState);
    });

    it('should handle LOCATION_CHANGE with grid data other than filter', () => {
        const searchString = queryString.stringify({
            grid: JSON.stringify({
                [gridName]: {
                    sort: 'foo'
                }
            })
        });

        const expectedGridState = Object.assign({}, initializedGridState);

        expect(reducer(initializedGridState, {
            type: LOCATION_CHANGE,
            payload: {
                search: searchString
            }
        })).toEqual(expectedGridState);
    });

    it('should handle LOCATION_CHANGE with grid data and no grid data in store', () => {
        const searchString = queryString.stringify({
            grid: JSON.stringify({
                [gridName]: {
                    filter: {
                        foo: 'bar'
                    }
                }
            })
        });

        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].filter = {
            foo: 'bar'
        };
        expectedGridState[gridName].pagination = {
            pageSize: null,
            currentPage: 1
        };

        expect(reducer({}, {
            type: LOCATION_CHANGE,
            payload: {
                search: searchString
            }
        })).toEqual(expectedGridState);
    });

    it('should handle DATA_CHANGED', () => {
        const changeDataAction = {
            type: types.DATA_CHANGED,
            name: gridName,
            data: [
                {
                    id: 1
                },
                {
                    id: 2
                }
            ]
        };

        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].data = [
            {
                id: 1
            },
            {
                id: 2
            }
        ];

        expect(reducer(initializedGridState, changeDataAction)).toEqual(expectedGridState);
    });

    it('should handle DATA_CHANGED with no grid data in store', () => {
        const changeDataAction = {
            type: types.DATA_CHANGED,
            name: gridName,
            data: [
                {
                    id: 1
                },
                {
                    id: 2
                }
            ]
        };

        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].data = [
            {
                id: 1
            },
            {
                id: 2
            }
        ];

        expect(reducer({}, changeDataAction)).toEqual(expectedGridState);
    });

    it('should handle SELECTION_CHANGED', () => {
        const changeSelectionAction = {
            type: types.SELECTION_CHANGED,
            name: gridName,
            value: [1],
            checked: true
        };

        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].selection = [1];

        expect(reducer(initializedGridState, changeSelectionAction)).toEqual(expectedGridState);
    });

    it('should handle SELECTION_CHANGED with no grid data in store', () => {
        const changeSelectionAction = {
            type: types.SELECTION_CHANGED,
            name: gridName,
            value: [1],
            checked: true
        };

        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].selection = [];

        expect(reducer({}, changeSelectionAction)).toEqual(expectedGridState);
    });

    it('should handle SELECTION_CHANGED with checkbox not checked', () => {
        const changeSelectionAction = {
            type: types.SELECTION_CHANGED,
            name: gridName,
            value: [1],
            checked: false
        };

        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].data = [
            {
                id: 1
            }
        ];
        expectedGridState[gridName].selection = [];

        const oldGridState = Object.assign({}, initializedGridState);
        oldGridState[gridName].data = [
            {
                id: 1
            }
        ];
        oldGridState[gridName].selection = [1];

        expect(reducer(oldGridState, changeSelectionAction)).toEqual(expectedGridState);
    });

    it('should handle redux-form INITIALIZE with payload', () => {
        const initializeFormAction = {
            type: formActions.INITIALIZE,
            meta: {
                form: 'testFilter'
            },
            payload: {
                foo: 'bar'
            }
        };

        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].filter = {
            foo: 'bar'
        };

        expect(reducer(initializedGridState, initializeFormAction)).toEqual(expectedGridState);
    });

    it('should handle redux-form INITIALIZE without payload', () => {
        const initializeFormAction = {
            type: formActions.INITIALIZE,
            meta: {
                form: 'testFilter'
            }
        };

        const expectedGridState = Object.assign({}, initializedGridState);

        expect(reducer(initializedGridState, initializeFormAction)).toEqual(expectedGridState);
    });

    it('should handle redux-form INITIALIZE without grid data in store', () => {
        const initializeFormAction = {
            type: formActions.INITIALIZE,
            meta: {
                form: 'otherFilter'
            }
        };

        const expectedGridState = Object.assign({}, initializedGridState, reducer(undefined, {
            type: types.INITIALIZE,
            name: 'other'
        }));

        expect(reducer(initializedGridState, initializeFormAction)).toEqual(expectedGridState);
    });

    it('should not handle redux-form INITIALIZE if form is not a filter form', () => {
        const initializeFormAction = {
            type: formActions.INITIALIZE,
            meta: {
                form: 'other_form'
            }
        };

        const expectedGridState = Object.assign({}, initializedGridState);

        expect(reducer(initializedGridState, initializeFormAction)).toEqual(expectedGridState);
    });

    it('should handle EDIT_START', () => {
        const editStartAction = {
            type: EDIT_START,
            name: gridName,
            rowId: 1,
            colId: 1
        };

        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].edit.colId = 1;
        expectedGridState[gridName].edit.rowId = 1;

        expect(reducer(initializedGridState, editStartAction)).toEqual(expectedGridState);
    });

    it('should handle redux-form START_SUBMIT', () => {
        const startSubmitAction = {
            type: formActions.START_SUBMIT,
            meta: {
                form: 'gridedit_test_1_1'
            }
        };

        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].edit.status = {1: {1: SUBMIT_STATUS_PENDING}};

        expect(reducer(initializedGridState, startSubmitAction)).toEqual(expectedGridState);
    });

    it('should handle redux-form START_SUBMIT for different form', () => {
        const startSubmitAction = {
            type: formActions.START_SUBMIT,
            meta: {
                form: 'anything_else'
            }
        };

        const expectedGridState = Object.assign({}, initializedGridState);

        expect(reducer(initializedGridState, startSubmitAction)).toEqual(expectedGridState);
    });

    it('should handle redux-form SET_SUBMIT_FAILED', () => {
        const failedSubmitAction = {
            type: formActions.SET_SUBMIT_FAILED,
            meta: {
                form: 'gridedit_test_1_1'
            }
        };

        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].edit.status = {1: {1: SUBMIT_STATUS_FAILURE}};

        expect(reducer(initializedGridState, failedSubmitAction)).toEqual(expectedGridState);
    });

    it('should handle redux-form SET_SUBMIT_SUCCEEDED', () => {
        const succeededSubmitAction = {
            type: formActions.SET_SUBMIT_SUCCEEDED,
            meta: {
                form: 'gridedit_test_1_1'
            }
        };

        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].edit.status = {1: {1: SUBMIT_STATUS_SUCCESS}};

        expect(reducer(initializedGridState, succeededSubmitAction)).toEqual(expectedGridState);
    });

    it('should handle redux-form SET_SUBMIT_SUCCEEDED after previous submit and with tmp values', () => {
        const succeededSubmitAction = {
            type: formActions.SET_SUBMIT_SUCCEEDED,
            meta: {
                form: 'gridedit_test_1_1'
            }
        };
        const stateBefore = Object.assign({}, initializedGridState);
        stateBefore[gridName].edit.values = {1: {2: 'foo'}};
        stateBefore[gridName].edit.tmp = {1: {1: 'foo'}};

        const expectedGridState = Object.assign({}, stateBefore);
        expectedGridState[gridName].edit.status = {1: {1: SUBMIT_STATUS_SUCCESS}};

        expect(reducer(stateBefore, succeededSubmitAction)).toEqual(expectedGridState);
    });

    it('should handle redux-form CHANGE', () => {
        const changeAction = {
            type: formActions.CHANGE,
            meta: {
                form: 'gridedit_test_1_1'
            },
            payload: 'foo'
        };

        const expectedGridState = {
            test: {
                data: [],
                filter: {},
                pagination: {},
                selection: [],
                sort: null,
                edit: {
                    colId: null,
                    rowId: null,
                    status: {1: {1: undefined}},
                    tmp: {1: {1: 'foo'}},
                    values: {}
                }
            }
        };

        expect(reducer(initializedGridState, changeAction)).toEqual(expectedGridState);
    });

    it('should handle redux-form CHANGE with previous change', () => {
        const changeAction = {
            type: formActions.CHANGE,
            meta: {
                form: 'gridedit_test_1_1'
            },
            payload: 'bar'
        };

        const stateBefore = Object.assign({}, initializedGridState);
        stateBefore[gridName].edit.tmp = {1: {1: 'foo'}};
        const expectedGridState = Object.assign({}, stateBefore);
        expectedGridState[gridName].edit.tmp = {1: {1: 'bar'}};

        expect(reducer(stateBefore, changeAction)).toEqual(expectedGridState);
    });
});