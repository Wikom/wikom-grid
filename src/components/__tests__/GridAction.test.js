import React from 'react'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import GridAction from "../GridAction";

const mockAction = jest.fn();

const setup = storeData => {
    const mockStore = configureStore()(storeData);
    return {
        mockStore
    }
};

describe('components', () => {
    describe('GridAction', () => {
        it('should render a row over all cols of a table', () => {
            const {mockStore} = setup({});
            const action = mount(
                <Provider store={mockStore}>
                    <GridAction symbol="pencil" action={mockAction}/>
                </Provider>
            );

            expect(action.find('i').hasClass('fa-pencil')).toBe(true);

            action.find('i').simulate('click');

            expect(mockAction.mock.calls.length).toBe(1);
        });
    });
});