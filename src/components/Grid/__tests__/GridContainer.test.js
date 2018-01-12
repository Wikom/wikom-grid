import React from 'react'
import {mount} from 'enzyme'
import GridContainer from '../GridContainer'
import GridComponent from '../GridComponent'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {DESTROY} from "../../../actions/actionTypes";

const setup = storeData => {
    const mockStore = configureStore([thunk])(storeData);
    return {
        mockStore
    }
};

describe('components', () => {
    describe('GridContainer', () => {

        it('should dispatch destroyGrid action when grid is destroyed', () => {
            const {mockStore} = setup({});
            const table = mount(
                <Provider store={mockStore}>
                    <GridContainer grid="test_grid" isLoading={false}/>
                </Provider>
            );

            expect(table.find(GridComponent).exists()).toBe(true);

            table.find(GridComponent).props().destroyGrid('test_grid');

            expect(mockStore.getActions().length).toBe(3);
            expect(mockStore.getActions()[2].type).toBe(DESTROY);
        });
    });
});