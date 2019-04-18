import React from 'react'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import GridFilter from "../";
import Filter from '../../Filter/index';
import {actionTypes} from 'redux-form'
import {INITIALIZE_FILTER} from '../../../actions/actionTypes'
import {CALL_HISTORY_METHOD} from 'react-router-redux'

const setup = storeData => {
    const mockStore = configureStore([thunk])(storeData);
    return {
        mockStore
    }
};

describe('components', () => {
    describe('GridFilter', () => {
        it('should render nothing if no filters are present', () => {
            const {mockStore} = setup({
                grid: {
                    test_grid: {
                        filter: {}
                    }
                }
            });
            const gridFilter = mount(
                <Provider store={mockStore}>
                    <GridFilter grid="test_grid"/>
                </Provider>
            );

            expect(gridFilter.html()).toBe(null);
        });

        it('should render a grid filter', () => {
            const {mockStore} = setup({
                routing: {
                    location: 'http://www.foo.bar'
                },
                form: {
                    test_gridFilter: {
                        registeredFields: {
                            test_filter: {}
                        }
                    }
                },
                grid: {
                    test_grid: {
                        filter: {
                            test_filter: 'foo'
                        }
                    }
                }
            });
            const gridFilter = mount(
                <Provider store={mockStore}>
                    <GridFilter grid="test_grid">
                        <Filter name="test_filter"/>
                        <Filter name="other_filter"/>
                        <span>NO FILTER</span>
                    </GridFilter>
                </Provider>
            );

            expect(gridFilter.find('form').find('div.box').exists()).toBe(true);

            expect(mockStore.getActions().length).toBe(2);
            expect(mockStore.getActions()[0].type).toBe(actionTypes.INITIALIZE);
            expect(mockStore.getActions()[mockStore.getActions().length - 1].type).toBe(INITIALIZE_FILTER);

            gridFilter.find('form').simulate('submit');

            expect(mockStore.getActions().length).toBe(5);
            expect(mockStore.getActions()[mockStore.getActions().length - 2].type).toBe(CALL_HISTORY_METHOD);

            gridFilter.find('i.fa-undo').simulate('click');

            expect(mockStore.getActions().length).toBe(6);
            expect(mockStore.getActions()[mockStore.getActions().length - 1].type).toBe(CALL_HISTORY_METHOD);
        });
    });
});