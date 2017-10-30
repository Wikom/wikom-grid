import React from 'react'
import {mount} from 'enzyme'
import BaseColumn from '../BaseColumn'

describe('components', () => {
    describe('BaseColumn', () => {
        it('should render a base column with a className as text', () => {
            const table = mount(
                <table>
                    <tbody>
                    <tr>
                        <BaseColumn className="testClass">
                            TEST
                        </BaseColumn>
                    </tr>
                    </tbody>
                </table>
            );

            expect(table.find('td').hasClass('testClass')).toBe(true);
        });

        it('should render a base column with a className as an object', () => {
            const table = mount(
                <table>
                    <tbody>
                    <tr>
                        <BaseColumn className={{td: 'testClass'}}>
                            TEST
                        </BaseColumn>
                    </tr>
                    </tbody>
                </table>
            );

            expect(table.find('td').hasClass('testClass')).toBe(true);
        });

        it('should render a base column with no className', () => {
            const table = mount(
                <table>
                    <tbody>
                    <tr>
                        <BaseColumn className={{th: 'testClass'}}>
                            TEST
                        </BaseColumn>
                    </tr>
                    </tbody>
                </table>
            );

            expect(table.find('td').hasClass('testClass')).toBe(false);
        });
    });
});