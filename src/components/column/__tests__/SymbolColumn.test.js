import React from 'react'
import {mount} from 'enzyme'
import SymbolColumn from '../SymbolColumn'

const symbols = {
    foo: 'pencil',
    bar: 'trash'
};

describe('components', () => {
    describe('SymbolColumn', () => {
        it('should render a symbol in a symbol column', () => {
            const rowData = {
                id: 1,
                value: 'foo'
            };

            const col = mount(
                <table>
                    <tbody>
                    <tr>
                        <SymbolColumn name="symbol" rowData={rowData} idx="value" symbols={symbols}/>
                    </tr>
                    </tbody>
                </table>
            );

            expect(col.find('td').find('.fa-pencil').exists()).toBe(true);
        });

        it('should render no symbol in a symbol column', () => {
            const rowData = {
                id: 1,
                value: 'baz'
            };

            const col = mount(
                <table>
                    <tbody>
                    <tr>
                        <SymbolColumn name="symbol" rowData={rowData} idx="value" symbols={symbols}/>
                    </tr>
                    </tbody>
                </table>
            );

            expect(col.find('td').text()).toBe('');
        });
    });
});