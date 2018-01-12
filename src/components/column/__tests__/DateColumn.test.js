/**
 * Created by marvin.ruppelt on 22.09.17.
 */

import React from 'react'
import {mount} from 'enzyme'
import DateColumn from '../DateColumn'

describe('components', () => {
    describe('DateColumn', () => {
        it('should render empty when not set', () => {
            const rowData = {
                id: 1
            };

            const col = mount(<table><tbody><tr>
                <DateColumn name="" rowData={rowData} idx="foo" />
            </tr></tbody></table>);

            expect(col.text()).toBe('');
        });

        it('should render simple date if not defined otherwise', () => {
            const rowData = {
                id: 1,
                foo: '3.5.2012 23:11'
            };

            const col = mount(<table><tbody><tr>
                <DateColumn name="" rowData={rowData} idx="foo" />
            </tr></tbody></table>);

            expect(col.text()).toBe('05.03.2012');
        });
    });

    it('should render simple date if not defined otherwise', () => {
        const rowData = {
            id: 1,
            foo: '3.5.2012 23:11'
        };

        const col = mount(<table><tbody><tr>
                <DateColumn name="" rowData={rowData} idx="foo" format="DD.MM.YYYY HH:mm" />
        </tr></tbody></table>);

        expect(col.text()).toBe('05.03.2012 23:11');
    });
});