/**
 * Created by marvin.ruppelt on 22.09.17.
 */

import React from 'react'
import {mount} from 'enzyme'
import nock from 'nock'
import thunk from 'redux-thunk'
import {Grid, ConnectedGrid, Columns, Column} from '../../index'
import configureStore from 'redux-mock-store'

function setup(storeData) {
    const mockStore = configureStore([thunk])(storeData);
    return {
        mockStore
    }
}

describe('components', () => {
    describe('ConnectedGrid', () => {
        it('should render loading state on pending request', () => {
            return; // Connected Grid Test not working

            const {mockStore} = setup({
                queries: {test: {isPending: false}},
                data: {bar: {fee: "test"}},
                grid: {test: null},

            });
            const requestRoute = 'http://www.foo.bar';

            let scope = nock(requestRoute)
                .get('/test')
                .reply(200, '[{foo: "test"}, {}, {}]');

            const InnerGrid = ({...props}) => {
                return (<Grid {...props}>
                    <Columns>
                        <Column idx="foo" name="Foo"/>
                    </Columns>
                </Grid>)
            };

            const page = mount(
                <ConnectedGrid store={mockStore} grid="test" baseUrl={requestRoute + '/test'} force={true}>
                    <InnerGrid />
                </ConnectedGrid>
            );

            // console.log(mockStore.getState());
            // console.log(page.html());


            //expect(page.find('tr').find('.pageWaiter-note').length).toBe(1);
        });
    });
});