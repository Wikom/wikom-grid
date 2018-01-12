import React from 'react'
import {mount} from 'enzyme'
import nock from 'nock'
import thunk from 'redux-thunk'
import Grid, {ConnectedGrid, Columns, Column} from '../index'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'

function setup(storeData) {
    const mockStore = configureStore([thunk])(storeData);
    return {
        mockStore
    }
}

describe('Integration Tests', () => {
    describe('ConnectedGrid', () => {
        it('should render loading state on pending request', () => {
            const {mockStore} = setup({
                queries: {test: {isPending: true}},
                data: {bar: {fee: "test"}},
                grid: {test: {}},

            });
            const requestRoute = 'http://www.foo.bar';

            let scope = nock(requestRoute)
                .get('/test')
                .reply(200, '[{foo: "test"}, {}, {}]');

            const InnerGrid = ({...props}) =>
                <Grid {...props}>
                    <Columns>
                        <Column idx="foo" name="Foo"/>
                    </Columns>
                </Grid>;

            const grid = mount(
                <Provider store={mockStore}>
                    <ConnectedGrid grid="test" baseUrl={requestRoute + '/test'} force={true}>
                        <InnerGrid/>
                    </ConnectedGrid>
                </Provider>
            );

            expect(grid.find(InnerGrid).props().isLoading).toBe(true);
        });

        it('should render one row for each rowData line', () => {
            const {mockStore} = setup({
                queries: {test: {isPending: false}},
                data: {test: [{foo: "test"}, {foo: 'bar'}, {foo: 'baz'}]},
                grid: {test: {}}
            });
            const requestRoute = 'http://www.foo.bar';

            nock(requestRoute)
                .get('/test')
                .reply(200, '[{foo: "test"}, {foo: "bar"}, {foo: "baz"}]');

            const InnerGrid = ({...props}) =>
                <Grid {...props}>
                    <Columns>
                        <Column idx="foo" name="Foo"/>
                    </Columns>
                </Grid>;

            const grid = mount(
                <Provider store={mockStore}>
                    <ConnectedGrid grid="test" baseUrl={requestRoute + '/test'} force={true}>
                        <InnerGrid/>
                    </ConnectedGrid>
                </Provider>
            );

            expect(grid.find(InnerGrid).find('tr').length).toBe(4);
        });
    });
});