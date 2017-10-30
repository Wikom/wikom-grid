import React from 'react'
import {mount} from 'enzyme'
import GridComponent from '../GridComponent'
import Columns from '../../Columns'
import Column from '../../column/Column'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import Pagination from '../../Pagination'

function setupStore(storeData) {
    const mockStore = configureStore()(storeData);
    return {
        mockStore
    }
}

const initialize = jest.fn();
const changeData = jest.fn();
const destroyGrid = jest.fn();

describe('components', () => {
    describe('GridComponent', () => {

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should display "no results"-message on empty data', () => {
            const page = mount(
                <GridComponent
                    isLoading={false}
                    grid="test"
                    initializeGrid={initialize}
                    changeData={changeData}
                    destroyGrid={destroyGrid}
                >
                    <Columns>
                        <Column name="Test 01" idx="test01"/>
                        <Column name="Test 02" idx="test02"/>
                    </Columns>
                </GridComponent>
            );

            expect(page.find('tbody').find('td').text()).toBe('Keine Ergebnisse vorhanden');
        });

        it('should render 3 rows for 3 data entries and pagination', () => {
            const {mockStore} = setupStore({});
            const data = [
                {test01: 'foo', test02: 'bar'},
                {test01: 'foo', test02: 'bar'},
                {test01: 'foo', test02: 'bar'}
            ];

            const page = mount(
                <Provider store={mockStore}>
                    <GridComponent
                        isLoading={false}
                        data={data}
                        grid="test"
                        initializeGrid={initialize}
                        changeData={changeData}
                        destroyGrid={destroyGrid}
                        pagination={{
                            currentPage: 1,
                            pageCount: 10,
                            perPage: 10,
                            totalCount: 100
                        }}
                        pageSizes={[10, 20, 50]}
                        paginationAfterGrid={false}
                    >
                        <Columns>
                            <Column name="Test 01" idx="test01"/>
                            <Column name="Test 02" idx="test02"/>
                        </Columns>
                    </GridComponent>
                </Provider>
            );

            expect(page.find('tbody').find('tr').length).toBe(3);
            expect(page.find(Pagination).length).toBe(1);
        });

        it('should render 3 rows for 3 data entries and pagination after grid', () => {
            const {mockStore} = setupStore({});
            const data = [
                {test01: 'foo', test02: 'bar'},
                {test01: 'foo', test02: 'bar'},
                {test01: 'foo', test02: 'bar'}
            ];

            const page = mount(
                <Provider store={mockStore}>
                    <GridComponent
                        isLoading={false}
                        data={data}
                        grid="test"
                        initializeGrid={initialize}
                        changeData={changeData}
                        destroyGrid={destroyGrid}
                        pagination={{
                            currentPage: 1,
                            pageCount: 10,
                            perPage: 10,
                            totalCount: 100
                        }}
                        pageSizes={[10, 20, 50]}
                        paginationAfterGrid={true}
                    >
                        <Columns>
                            <Column name="Test 01" idx="test01"/>
                            <Column name="Test 02" idx="test02"/>
                        </Columns>
                    </GridComponent>
                </Provider>
            );

            expect(page.find('tbody').find('tr').length).toBe(3);
            expect(page.find(Pagination).length).toBe(1);
        });

        it('should add a className to the table', () => {
            const className = 'foobar';

            const page = mount(
                <GridComponent
                    isLoading={false}
                    grid="test"
                    className={className}
                    initializeGrid={initialize}
                    changeData={changeData}
                    destroyGrid={destroyGrid}
                >
                    <Columns>
                        <Column name="Test 01" idx="test01"/>
                        <Column name="Test 02" idx="test02"/>
                    </Columns>
                </GridComponent>
            );

            expect(page.find('table').hasClass(className)).toBe(true);
        });

        it('should change loading status', () => {
            const page = mount(
                <GridComponent
                    isLoading={true}
                    grid="test"
                    initializeGrid={initialize}
                    changeData={changeData}
                    destroyGrid={destroyGrid}
                >
                    <Columns>
                        <Column name="Test 01" idx="test01"/>
                        <Column name="Test 02" idx="test02"/>
                    </Columns>
                </GridComponent>
            );

            expect(changeData.mock.calls.length).toBe(1);

            page.setProps({
                isLoading: false
            });

            expect(page.find('td').text()).toBe('Keine Ergebnisse vorhanden');
        });

        it('should render a different Grid Component', () => {
            const page = mount(
                <GridComponent
                    isLoading={false}
                    grid="test"
                    initializeGrid={initialize}
                    changeData={changeData}
                    destroyGrid={destroyGrid}
                >
                    <Columns>
                        <Column name="Test 01" idx="test01"/>
                        <Column name="Test 02" idx="test02"/>
                    </Columns>
                </GridComponent>
            );

            expect(initialize.mock.calls.length).toBe(1);
            expect(destroyGrid.mock.calls.length).toBe(0);

            page.setProps({
                grid: 'other_grid'
            });

            expect(initialize.mock.calls.length).toBe(2);
            expect(destroyGrid.mock.calls.length).toBe(1);
        });

        it('should call destroy action when grid is unmounted', () => {
            const page = mount(
                <GridComponent
                    isLoading={false}
                    grid="test"
                    initializeGrid={initialize}
                    changeData={changeData}
                    destroyGrid={destroyGrid}
                >
                    <Columns>
                        <Column name="Test 01" idx="test01"/>
                        <Column name="Test 02" idx="test02"/>
                    </Columns>
                </GridComponent>
            );

            page.unmount();

            expect(destroyGrid.mock.calls.length).toBe(1);
        });

        it('should ignore elements not suitable for Grid Component', () => {
            const Dummy = () => <div>don't render me!</div>;
            const page = mount(
                <GridComponent
                    isLoading={false}
                    grid="test"
                    initializeGrid={initialize}
                    changeData={changeData}
                    destroyGrid={destroyGrid}
                >
                    <Columns>
                        <Column name="Test 01" idx="test01"/>
                        <Column name="Test 02" idx="test02"/>
                        {[1, 2]}
                    </Columns>
                    <Dummy/>
                </GridComponent>
            );

            expect(page.text()).not.toMatch('don\'t render me!');
        });


    });
});