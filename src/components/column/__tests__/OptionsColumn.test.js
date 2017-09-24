/**
 * Created by marvin.ruppelt on 22.09.17.
 */

import React from 'react'
import {mount} from 'enzyme'
import OptionsColumn from '../OptionsColumn'
import configureStore from 'redux-mock-store'


describe('components', () => {
    describe('OptionsColumn', () => {
        it('should render column option', () => {
            const rowData = {
                id: 1,
                foo: 'bar'
            };

            const options= {
                bar: 'barbar',
            };

            const col = mount(<table><tbody><tr>
                <OptionsColumn name="" rowData={rowData} idx="foo" options={options} />
            </tr></tbody></table>);

            expect(col.text()).toBe('barbar');
        });

        it('should render column with no option available', () => {
            const rowData = {
                id: 1,
                foo: 'bar'
            };


            const col = mount(<table><tbody><tr>
                <OptionsColumn name="" rowData={rowData} idx="foo" options={{}} />
            </tr></tbody></table>);

            expect(col.text()).toBe('');
        });
    });
});