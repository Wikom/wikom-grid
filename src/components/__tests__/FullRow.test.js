import React from 'react'
import {shallow} from 'enzyme'
import FullRow from "../FullRow";

describe('components', () => {
    describe('FullRow', () => {
        it('should render a row over all cols of a table', () => {
            const table = shallow(
                <table>
                    <tbody>
                    <FullRow colSpan={2}>
                        INNER
                    </FullRow>
                    </tbody>
                </table>
            );

            expect(table.contains('INNER')).toBe(true);
            expect(table.html()).toBe('<table><tbody><tr><td colspan="2" class="text-center">INNER</td></tr></tbody></table>');
        });
    });
});