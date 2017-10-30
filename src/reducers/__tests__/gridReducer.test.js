import reducer from '../gridReducer'
import * as types from '../../actions/actionTypes'
import {LOCATION_CHANGE} from 'react-router-redux'
import {actionTypes as formActions} from 'redux-form'
import * as status from '../../constants/fieldStatus'
import queryString from 'query-string'

const gridName = 'test_grid';
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
                    current: {
                        row: null,
                        cell: null
                    },
                    next: {
                        row: null,
                        cell: null
                    },
                    status: {}
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
                form: 'test_gridFilter'
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
                form: 'test_gridFilter'
            }
        };

        const expectedGridState = Object.assign({}, initializedGridState);

        expect(reducer(initializedGridState, initializeFormAction)).toEqual(expectedGridState);
    });

    it('should handle redux-form INITIALIZE without grid data in store', () => {
        const initializeFormAction = {
            type: formActions.INITIALIZE,
            meta: {
                form: 'other_gridFilter'
            }
        };

        const expectedGridState = Object.assign({}, initializedGridState, reducer(undefined, {
            type: types.INITIALIZE,
            name: 'other_grid'
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

    it('should handle SETNEXTEDITROW', () => {
        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].edit = {
            current: {
                row: 1,
                cell: null
            },
            next: {
                row: null,
                cell: null
            },
            status: {}
        };

        expect(reducer(initializedGridState, {
            type: types.SETNEXTEDITROW,
            name: gridName,
            index: 1
        })).toEqual(expectedGridState);
    });

    it('should handle SETNEXTEDITROW with no grid data in store', () => {
        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].edit = {
            current: {
                row: 1,
                cell: null
            },
            next: {
                row: null,
                cell: null
            },
            status: {}
        };

        expect(reducer({}, {
            type: types.SETNEXTEDITROW,
            name: gridName,
            index: 1
        })).toEqual(expectedGridState);
    });

    it('should handle SETNEXTEDITROW with previous edit row present', () => {
        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].edit = {
            current: {
                row: 1,
                cell: null
            },
            next: {
                row: 2,
                cell: null
            },
            status: {
                foo: status.STATUS_SAVED,
                bar: status.STATUS_INSUBMISSION
            }
        };

        const oldGridState = Object.assign({}, initializedGridState);
        oldGridState[gridName].edit = {
            current: {
                row: 1,
                cell: null
            },
            next: {
                row: null,
                cell: null
            },
            status: {
                foo: status.STATUS_SAVED,
                bar: status.STATUS_INSUBMISSION
            }
        };

        expect(reducer(oldGridState, {
            type: types.SETNEXTEDITROW,
            name: gridName,
            index: 2
        })).toEqual(expectedGridState);
    });

    it('should handle FIELDSAVED', () => {
        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].edit = {
            current: {
                row: 1,
                cell: null
            },
            next: {
                row: null,
                cell: null
            },
            status: {
                foo: status.STATUS_SAVED
            }
        };

        expect(reducer(initializedGridState, {
            type: types.FIELDSAVED,
            name: gridName,
            idx: 'foo'
        })).toEqual(expectedGridState);
    });

    it('should handle FIELDSAVED with no grid data in store', () => {
        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].edit.status = {
            foo: status.STATUS_SAVED
        };

        expect(reducer({}, {
            type: types.FIELDSAVED,
            name: gridName,
            idx: 'foo'
        })).toEqual(expectedGridState);
    });

    it('should handle FIELDSAVED with next row in store', () => {
        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].edit = {
            current: {
                row: 2,
                cell: null
            },
            next: {
                row: null,
                cell: null
            },
            status: {}
        };

        const oldGridState = Object.assign({}, initializedGridState);
        oldGridState[gridName].edit = {
            current: {
                row: 1,
                cell: null
            },
            next: {
                row: 2,
                cell: null
            },
            status: {}
        };

        expect(reducer(oldGridState, {
            type: types.FIELDSAVED,
            name: gridName,
            idx: 'foo'
        })).toEqual(expectedGridState);
    });

    it('should handle FIELDCHANGED', () => {
        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].edit = {
            current: {
                row: 1,
                cell: null
            },
            next: {
                row: null,
                cell: null
            },
            status: {
                foo: status.STATUS_CHANGED
            }
        };

        expect(reducer(initializedGridState, {
            type: types.FIELDCHANGED,
            name: gridName,
            idx: 'foo'
        })).toEqual(expectedGridState);
    });

    it('should handle FIELDCHANGED with no grid data in store', () => {
        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].edit.status = {
            foo: status.STATUS_CHANGED
        };

        expect(reducer({}, {
            type: types.FIELDCHANGED,
            name: gridName,
            idx: 'foo'
        })).toEqual(expectedGridState);
    });

    it('should handle FIELDCHANGED with next row in store', () => {
        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].edit = {
            current: {
                row: 2,
                cell: null
            },
            next: {
                row: 2,
                cell: null
            },
            status: {
                foo: status.STATUS_CHANGED
            }
        };

        const oldGridState = Object.assign({}, initializedGridState);
        oldGridState[gridName].edit = {
            current: {
                row: 1,
                cell: null
            },
            next: {
                row: 2,
                cell: null
            },
            status: {
                foo: status.STATUS_CHANGED
            }
        };

        expect(reducer(oldGridState, {
            type: types.FIELDCHANGED,
            name: gridName,
            idx: 'foo'
        })).toEqual(expectedGridState);
    });

    it('should handle FIELDINSUBMISSION', () => {
        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].edit = {
            current: {
                row: 1,
                cell: null
            },
            next: {
                row: null,
                cell: null
            },
            status: {
                foo: status.STATUS_INSUBMISSION
            }
        };

        expect(reducer(initializedGridState, {
            type: types.FIELDINSUBMISSION,
            name: gridName,
            idx: 'foo'
        })).toEqual(expectedGridState);
    });

    it('should handle FIELDINSUBMISSION with no grid data in store', () => {
        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].edit.status = {
            foo: status.STATUS_INSUBMISSION
        };

        expect(reducer({}, {
            type: types.FIELDINSUBMISSION,
            name: gridName,
            idx: 'foo'
        })).toEqual(expectedGridState);
    });

    it('should handle FIELDSUBMISSIONFAILED', () => {
        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].edit = {
            current: {
                row: 1,
                cell: null
            },
            next: {
                row: null,
                cell: null
            },
            status: {
                foo: status.STATUS_ERROR
            }
        };

        expect(reducer(initializedGridState, {
            type: types.FIELDSUBMISSIONFAILED,
            name: gridName,
            idx: 'foo'
        })).toEqual(expectedGridState);
    });

    it('should handle FIELDSUBMISSIONFAILED with no grid data in store', () => {
        const expectedGridState = Object.assign({}, initializedGridState);
        expectedGridState[gridName].edit.status = {
            foo: status.STATUS_ERROR
        };

        expect(reducer({}, {
            type: types.FIELDSUBMISSIONFAILED,
            name: gridName,
            idx: 'foo'
        })).toEqual(expectedGridState);
    });

});