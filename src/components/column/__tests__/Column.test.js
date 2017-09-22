/**
 * Created by marvin.ruppelt on 22.09.17.
 */

import React from 'react'
import {mount} from 'enzyme'
import Column from '../Column'
import configureStore from 'redux-mock-store'


describe('components', () => {
    describe('Column', () => {
        it('should render column with text', () => {
            const rowData = {
                id: 1,
                foo: 'bar'
            };

            const col = mount(<Column name="" rowData={rowData} idx="foo" />);

            expect(col.text()).toBe('bar');
        });
    });
});