import React from 'react'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Pagination, {PAGINATION_COUNT_FORMAT_FULL} from "../";
import {CALL_HISTORY_METHOD} from 'react-router-redux'
import Pager from 'react-pager'

const setup = storeData => {
    const mockStore = configureStore([thunk])(storeData);
    return {
        mockStore
    }
};

describe('components', () => {
    describe('Pagination', () => {
        it('should render a grid pagination', () => {
            const {mockStore} = setup({
                routing: {
                    location: 'http://www.foo.bar'
                }
            });
            const pagination = mount(
                <Provider store={mockStore}>
                    <Pagination
                        grid="test_grid"
                        pageSizes={[10, 50]}
                        pageCount={10}
                        currentPage={1}
                    />
                </Provider>
            );

            expect(pagination.find('.grid-before-table').exists()).toBe(true);

            pagination.find('[name="pagesizeSelect"]').simulate('change', {value: 50});

            expect(mockStore.getActions().length).toBe(1);
            expect(mockStore.getActions()[0].type).toBe(CALL_HISTORY_METHOD);

            pagination.find(Pager).find('li.btn-numbered-page').at(1).find('a').simulate('click');

            expect(mockStore.getActions().length).toBe(2);
            expect(mockStore.getActions()[1].type).toBe(CALL_HISTORY_METHOD);
        });

        it('should render a grid pagination in full format', () => {
            const {mockStore} = setup({
                routing: {
                    location: 'http://www.foo.bar'
                }
            });
            const pagination = mount(
                <Provider store={mockStore}>
                    <Pagination
                        grid="test_grid"
                        pageSizes={[10, 50]}
                        pageCount={10}
                        currentPage={1}
                        perPage={10}
                        totalCount={100}
                        paginationCountFormat={PAGINATION_COUNT_FORMAT_FULL}
                    />
                </Provider>
            );

            expect(pagination.find('.grid-before-table').text()).toMatch(/1 bis 10 von 100 Einträgen/);
        });

        it('should render a grid pagination in full format with only one page', () => {
            const {mockStore} = setup({
                routing: {
                    location: 'http://www.foo.bar'
                }
            });
            const pagination = mount(
                <Provider store={mockStore}>
                    <Pagination
                        grid="test_grid"
                        pageSizes={[10, 50]}
                        pageCount={1}
                        currentPage={1}
                        perPage={10}
                        totalCount={5}
                        paginationCountFormat={PAGINATION_COUNT_FORMAT_FULL}
                    />
                </Provider>
            );

            expect(pagination.find('.grid-before-table').text()).toMatch(/1 bis 5 von 5 Einträgen/);
        });
    });
});