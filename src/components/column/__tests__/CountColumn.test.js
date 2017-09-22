/**
 * Created by marvin.ruppelt on 22.09.17.
 */

import React from 'react'
import {mount} from 'enzyme'
import CountColumn from '../CountColumn'


describe('components', () => {
    describe('CountColumn', () => {
        it('count array elements', () => {
            const rowData = {
                id: 1,
                foo: [1,2,3,4,5,6]
            };

            const falseCol = mount(<CountColumn name="" rowData={rowData} idx="foo" type="string" />);
            expect(falseCol.find('td').text()).toBe('6');

        });


        it('attribute not set => result sould be 0', () => {
            const rowData = {
                id: 1
            };

            const falseCol = mount(<CountColumn name="" rowData={rowData} idx="foo" type="string" />);
            expect(falseCol.find('td').text()).toBe('0');

        });
    });
});