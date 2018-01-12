import React from 'react'
import {mount, shallow} from 'enzyme'
import EditComponent, {RawEditComponent} from '../EditComponent'
import {Field, reducer as formReducer} from 'redux-form'
import configureStore from 'redux-mock-store'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {Checkbox} from '../../../formComponents'

const setupStore = storeData => {
    return configureStore()(storeData);
};

describe('components', () => {
    describe('EditComponent', () => {
        it('should render a Form Field', () => {
            const editComponent = shallow(
                <RawEditComponent idx="test"/>
            );

            expect(editComponent.find(Field).length).toBe(1);
        });

        it('should fire blur event with pristine form', () => {
            const store = setupStore({form: {}});
            const onBlur = jest.fn();
            const handleSubmit = jest.fn();
            const editComponent = mount(
                <Provider store={store}>
                    <EditComponent idx="test" onBlur={onBlur} handleSubmit={handleSubmit} grid="test" rowId={1} colId={1} form="gridedit_test_1_1"/>
                </Provider>
            );

            editComponent.find(Field).find('input').simulate('blur');
            expect(handleSubmit.mock.calls.length).toBe(0);
            expect(onBlur.mock.calls.length).toBe(1);
        });

        it('should handle boolean values in form field', () => {
            const store = createStore(combineReducers({form: formReducer}));
            const onBlur = jest.fn();
            const handleSubmit = jest.fn();
            const editComponent = mount(
                <Provider store={store}>
                    <EditComponent
                        idx="test"
                        component={Checkbox}
                        onBlur={onBlur}
                        handleSubmit={handleSubmit}
                        grid="test"
                        rowId={1}
                        colId={1}
                        form="gridedit_test_1_1"
                        initialValues={{test: false}}
                    />
                </Provider>
            );

            expect(editComponent.find(Field).prop('normalize')(true)).toBe('1');
            expect(editComponent.find(Field).prop('normalize')(false)).toBe('0');
        });

        it('should fire blur event with dirty form', () => {
            const store = createStore(combineReducers({form: formReducer}));
            const onBlur = jest.fn();
            const handleSubmit = jest.fn();
            const editComponent = mount(
                <Provider store={store}>
                    <EditComponent
                        idx="test"
                        onBlur={onBlur}
                        handleSubmit={handleSubmit}
                        grid="test"
                        rowId={1}
                        colId={1}
                        form="gridedit_test_1_1"
                        initialValues={{test: 'My old value'}}
                    />
                </Provider>
            );

            editComponent.find(Field).find('input').simulate('change', {target: {value: 'My new value'}});
            editComponent.find(Field).find('input').simulate('blur');
            expect(handleSubmit.mock.calls.length).toBe(1);
            expect(onBlur.mock.calls.length).toBe(1);
        });

    });
});