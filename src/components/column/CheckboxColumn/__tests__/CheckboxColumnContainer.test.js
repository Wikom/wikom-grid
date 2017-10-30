import React from 'react'
import {mount, shallow} from 'enzyme'
import CheckboxColumnContainer from '../CheckboxColumnContainer'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import {SELECTION_CHANGED} from '../../../../actions/actionTypes'

const setupStore = storeData => {
    return configureStore()(storeData);
};

const mockAction = jest.fn();

describe('components', () => {
    describe('CheckboxColumn', () => {
        it('should render a checkbox column', () => {
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
                        <tbody>
                        <tr>
                            <CheckboxColumnContainer
                                grid="test_grid"
                                rowData={rowData}
                                idx="id"
                                onChange={mockAction}
                            />
                        </tr>
                        </tbody>
                    </table>
                </Provider>
            );

            expect(table.find('td').find('input[type="checkbox"]').exists()).toBe(true);

            table.find('td').find('input[type="checkbox"]').simulate('change');

            expect(store.getActions().length).toBe(1);
            expect(store.getActions()[0].type).toBe(SELECTION_CHANGED);
        });

    });
});