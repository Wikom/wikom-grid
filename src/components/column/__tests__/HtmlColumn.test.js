/**
 * Created by marvin.ruppelt on 22.09.17.
 */

import React from 'react'
import {mount} from 'enzyme'
import HtmlColumn from '../HtmlColumn'
import configureStore from 'redux-mock-store'


describe('components', () => {
    describe('HtmlColumn', () => {
        it('should render column with HTML text', () => {
            const rowData = {
                id: 1,
                foo: '<b>foo bar</b>'
            };

            const col = mount(<table><tbody><tr>
                <HtmlColumn name="" rowData={rowData} idx="foo" />
            </tr></tbody></table>);

            expect(col.find('span').text()).toBe('foo bar');
        });

        it('should render column without data text: empty span', () => {
            const rowData = {
                id: 1,
            };

            const col = mount(<table><tbody><tr>
                <HtmlColumn name="" rowData={rowData} idx="foo" />
            </tr></tbody></table>);

            expect(col.find('span').text()).toBe('');
        });
    });
});