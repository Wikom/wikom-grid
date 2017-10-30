import React from 'react'
import {mount, shallow} from 'enzyme'
import nock from 'nock'
import thunk from 'redux-thunk'
import Grid, {ConnectedGrid, Columns, Column} from '../../../index'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import ConnectedGridComponent from "../ConnectedGridComponent";
import DataProvider from 'wikom-data'

describe('components', () => {
    describe('ConnectedGridComponent', () => {
        it('should render a DataProvider and pass all props', () => {
            const grid = shallow(
                <ConnectedGridComponent
                    grid="test_grid"
                    url="http://www.foo.bar"
                    force={false}
                >
                    <div>INNER</div>
                </ConnectedGridComponent>
            );

            expect(grid.find(DataProvider).props().name).toBe('test_grid');
            expect(grid.find(DataProvider).props().url).toBe('http://www.foo.bar');
            expect(grid.find(DataProvider).props().force).toBe(false);
        });
    });
});