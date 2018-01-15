import React from 'react'
import {mount} from 'enzyme'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import {MemoryRouter} from 'react-router'
import ActionColumn from '../ActionColumn'
import GridAction from '../../GridAction'
import GridLink from '../../GridLink'

const setupStore = storeData => {
    const mockStore = configureStore()(storeData);
    return {
        mockStore
    }
};

const mockAction = jest.fn();

describe('components', () => {
    describe('ActionColumn', () => {
        it('should render an action column with a Link and an Action', () => {
            const {mockStore} = setupStore({});

            const rowData = {
                id: 1
            };

            const SpecialAction = ({rowData}) => <div>{JSON.stringify(rowData)}</div>;

            const table = mount(
                <Provider store={mockStore}>
                    <MemoryRouter>
                    <table>
                        <tbody>
                        <tr>
                            <ActionColumn name="Aktionen" rowData={rowData}>
                                <GridLink symbol="pencil" to="http://localhost/details"/>
                                <GridAction symbol="trash" action={mockAction}/>
                                <SpecialAction/>
                                <span>TEST</span>
                            </ActionColumn>
                        </tr>
                        </tbody>
                    </table>
                    </MemoryRouter>
                </Provider>
            );

            expect(table.find('td').find('a[href="http://localhost/details/1"]').exists()).toBe(true);

            table.find('td').find('.fa-trash').simulate('click');

            expect(mockAction.mock.calls.length).toBe(1);
            expect(mockAction.mock.calls[0][0]).toBe(1);
        });

        it('should render an action column with classname as object', () => {
            const {mockStore} = setupStore({});

            const rowData = {
                id: 1
            };

            const table = mount(
                <Provider store={mockStore}>
                    <MemoryRouter>
                        <table>
                            <tbody>
                            <tr>
                                <ActionColumn name="Aktionen" rowData={rowData} className={{td: 'test'}}>
                                    <GridLink symbol="pencil" to="http://localhost/details"/>
                                </ActionColumn>
                            </tr>
                            </tbody>
                        </table>
                    </MemoryRouter>
                </Provider>
            );

            expect(table.find('td').hasClass('test')).toBe(true);
        });

        it('should render an action column with classname as object and no td prop', () => {
            const {mockStore} = setupStore({});

            const rowData = {
                id: 1
            };

            const table = mount(
                <Provider store={mockStore}>
                    <MemoryRouter>
                        <table>
                            <tbody>
                            <tr>
                                <ActionColumn name="Aktionen" rowData={rowData} className={{th: 'test'}}>
                                    <GridLink symbol="pencil" to="http://localhost/details"/>
                                </ActionColumn>
                            </tr>
                            </tbody>
                        </table>
                    </MemoryRouter>
                </Provider>
            );

            expect(table.find('td').hasClass('test')).toBe(false);
        });
    });
});