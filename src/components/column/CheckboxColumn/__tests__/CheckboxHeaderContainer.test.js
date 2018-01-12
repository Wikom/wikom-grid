import React from 'react'
import {mount} from 'enzyme'
import CheckboxHeaderContainer from '../CheckboxHeaderContainer'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import {SELECTION_CHANGED} from '../../../../actions/actionTypes'

const setupStore = storeData => {
    return configureStore()(storeData);
};

describe('components', () => {
    describe('CheckboxHeaderContainer', () => {
        it('should render a checkbox column header', () => {
            const store = setupStore({
                grid: {
                    test_grid: {
                        data: [
                            {
                                id: 1
                            },
                            {
                                id: 2
                            }
                        ],
                        selection: [
                            1
                        ]
                    }
                }
            });
            const rowData = {
                id: 1,
                value: 'foo'
            };

            const table = mount(
                <Provider store={store}>
                    <table>
                        <thead>
                        <tr>
                            <CheckboxHeaderContainer
                                grid="test_grid"
                                idx="id"
                            />
                        </tr>
                        </thead>
                    </table>
                </Provider>
            );

            expect(table.find('th').find('input[type="checkbox"]').exists()).toBe(true);

            table.find('th').find('input[type="checkbox"]').simulate('change');

            expect(store.getActions().length).toBe(1);
            expect(store.getActions()[0].type).toBe(SELECTION_CHANGED);
        });

        it('should render a checkbox column header with no grid in store', () => {
            const store = setupStore({
                grid: {}
            });

            const table = mount(
                <Provider store={store}>
                    <table>
                        <thead>
                        <tr>
                            <CheckboxHeaderContainer
                                grid="test_grid"
                                idx="id"
                            />
                        </tr>
                        </thead>
                    </table>
                </Provider>
            );

            expect(table.find('th').find('input[type="checkbox"]').exists()).toBe(true);

            table.find('th').find('input[type="checkbox"]').simulate('change');

            expect(store.getActions().length).toBe(1);
            expect(store.getActions()[0].type).toBe(SELECTION_CHANGED);
        });
    });
});