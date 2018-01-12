import React from 'react'
import {mount} from 'enzyme'
import Header from "../Header";
import {Column} from '../column'

describe('components', () => {
    describe('Header', () => {
        it('should render a simple header row for a table', () => {
            const columns = [
                <Column name="TEST"/>
            ];
            const table = mount(
                <table>
                    <thead>
                    <Header columns={columns}/>
                    </thead>
                </table>
            );

            expect(table.find('th').length).toBe(1);
            expect(table.html()).toBe('<table><thead><tr><th class=""><span class="table-head-title">TEST</span></th></tr></thead></table>');
        });

        it('should render a sortable header row with active asc sorting', () => {
            const columns = [
                <Column
                    name="TEST"
                    idx="foo"
                    sortable={true}
                    className="test"
                />
            ];
            const table = mount(
                <table>
                    <thead>
                    <Header columns={columns} activeSort="foo" handleSort={() => jest.fn()}/>
                    </thead>
                </table>
            );

            expect(table.find('th').length).toBe(1);
            expect(table.html()).toBe('<table><thead><tr><th class="test sort-asc sortable"><span class="table-head-title">TEST</span></th></tr></thead></table>');
        });

        it('should render a sortable header row with active desc sorting', () => {
            const columns = [
                <Column
                    name="TEST"
                    idx="foo"
                    sortable={true}
                    className={{th: 'test'}}
                />,
                <Column
                    name="TEST2"
                    idx="bar"
                    sortable={true}
                    className={{td: 'td_test'}}
                />
            ];
            const table = mount(
                <table>
                    <thead>
                    <Header columns={columns} activeSort="-foo" handleSort={() => jest.fn()}/>
                    </thead>
                </table>
            );

            expect(table.find('th').length).toBe(2);
            expect(table.html()).toBe('<table><thead><tr><th class="test sort-desc sortable"><span class="table-head-title">TEST</span></th><th class="sortable"><span class="table-head-title">TEST2</span></th></tr></thead></table>');
        });

        it('should render a header row with a ThComponent', () => {
            const columns = [
                <Column name="TEST" ThComponent={() => <th>TEST</th>}/>
            ];
            const table = mount(
                <table>
                    <thead>
                    <Header columns={columns}/>
                    </thead>
                </table>
            );

            expect(table.find('th').length).toBe(1);
            expect(table.html()).toBe('<table><thead><tr><th>TEST</th></tr></thead></table>');
        });

        it('should handle sorting', () => {
            const handleSort = jest.fn();
            const columns = [
                <Column
                    name="TEST"
                    idx="foo"
                    sortable={true}
                    className="test"
                />
            ];
            const table = mount(
                <table>
                    <thead>
                    <Header columns={columns} activeSort="foo" handleSort={handleSort}/>
                    </thead>
                </table>
            );

            table.find('th').simulate('click');

            expect(handleSort.mock.calls.length).toBe(1);
        });

    });
});