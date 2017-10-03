/**
 * Created by marvin.ruppelt on 21.09.17.
 */

import React from 'react'
import * as types from '../../actions/actionTypes'
import {mount} from 'enzyme'
import {GridContainer as Grid, Columns, Column} from '../../index'
import configureStore from 'redux-mock-store'

function setupStore(storeData) {
    const mockStore = configureStore()(storeData);
    return {
        mockStore
    }
}

describe('components', () => {
    describe('Grid', () => {
        it('should render loading state ', () => {
            const {mockStore} = setupStore({
            });

            const page = mount(<Grid store={mockStore} isLoading={true} grid="test" />);

            expect(page.find('tr').find('.pageWaiter-note').length).toBe(1);
        });

        it('display "no results"-message on empty data', () => {
            const {mockStore} = setupStore({
            });

            const page = mount(
                <Grid store={mockStore} isLoading={false} grid="test">
                    <Columns>
                        <Column name="Test 01" idx="test01" />
                        <Column name="Test 02" idx="test02" />
                    </Columns>
                </Grid>);

            expect(page.find('tbody').find('td').text()).toBe('Keine Ergebnisse vorhanden');
        });

        it('three data entrys sould result in three tbody rows', () => {
            const {mockStore} = setupStore({
            });

            const data = [
                {test01: 'foo', test02: 'bar'},
                {test01: 'foo', test02: 'bar'},
                {test01: 'foo', test02: 'bar'}
            ];

            const page = mount(
                <Grid store={mockStore} isLoading={false} data={data} grid="test">
                    <Columns>
                        <Column name="Test 01" idx="test01" />
                        <Column name="Test 02" idx="test02" />
                    </Columns>
                </Grid>);

            expect(page.find('tbody').find('tr').length).toBe(3);
        });

        it('className for table?', () => {
            const {mockStore} = setupStore({
            });
            const className = 'foobar';

            const page = mount(
                <Grid store={mockStore} isLoading={false} grid="test" className={className}>
                    <Columns>
                        <Column name="Test 01" idx="test01" />
                        <Column name="Test 02" idx="test02" />
                    </Columns>
                </Grid>);

            expect(page.find('table').hasClass(className)).toBe(true);
        });
    });
});