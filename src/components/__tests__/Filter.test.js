import React from 'react'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import Filter, {FilterComponent} from "../Filter";

const setup = storeData => {
    const mockStore = configureStore()(storeData);
    return {
        mockStore
    }
};

describe('components', () => {
    describe('Filter', () => {
        it('should render a container for filter children', () => {
            const {mockStore} = setup({
                grid: {
                    test_grid: {
                        filter: {
                            test_filter: 'foo'
                        }
                    }
                }
            });
            const filter = mount(
                <Provider store={mockStore}>
                    <div>
                        <Filter name="test_filter" grid="test_grid">
                            <div>INNER</div>
                        </Filter>
                        <Filter name="other_filter" grid="test_grid">
                            <div>INNER</div>
                        </Filter>
                    </div>
                </Provider>
            );

            expect(filter.contains('INNER')).toBe(true);
            expect(filter.find(FilterComponent).at(0).props().className).toBe('col-sm-6 col-md-4 col-lg-3 form-group filter-element filter_active');
            expect(filter.find(FilterComponent).at(1).props().className).toBe('col-sm-6 col-md-4 col-lg-3 form-group filter-element');
        });
    });
});