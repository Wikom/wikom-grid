import React from 'react'
import {mount} from 'enzyme'
import Row from "../Row";
import {Column} from '../column'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {SETNEXTEDITROW} from "../../actions/actionTypes";

const setup = storeData => {
    const mockStore = configureStore([thunk])(storeData);
    return {
        mockStore
    }
};

describe('components', () => {
    describe('Row', () => {
        it('should render a grid row', () => {
            const {mockStore} = setup({
                routing: {
                    location: 'http://www.foo.bar'
                }
            });
            const table = mount(
                <Provider store={mockStore}>
                    <table>
                        <tbody>
                        <Row rowData={{foo: 'bar'}} grid="test_grid">
                            <Column name="foo" idx="foo"/>
                        </Row>
                        </tbody>
                    </table>
                </Provider>
            );

            expect(table.find('td').exists()).toBe(true);
            expect(table.find('td').html()).toBe('<td>bar</td>');
        });

        it('should render an editable grid row', () => {
            const {mockStore} = setup({
                routing: {
                    location: 'http://www.foo.bar'
                }
            });
            const table = mount(
                <Provider store={mockStore}>
                    <table>
                        <tbody>
                        <Row rowData={{foo: 'bar'}} grid="test_grid" editable={true}>
                            <Column name="foo" idx="foo"/>
                        </Row>
                        </tbody>
                    </table>
                </Provider>
            );

            expect(table.find('td').exists()).toBe(true);
            expect(table.find('td').html()).toBe('<td>bar</td>');

            table.find('td').simulate('click');

            expect(mockStore.getActions().length).toBe(1);
            expect(mockStore.getActions()[0].type).toBe(SETNEXTEDITROW);
        });
    });
});