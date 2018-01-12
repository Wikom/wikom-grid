import React from 'react'
import {mount} from 'enzyme'
import CheckboxColumnComponent from '../CheckboxColumnComponent'

const mockAction = jest.fn();

describe('components', () => {
    describe('CheckboxColumn', () => {
        it('should render a checkbox column', () => {
            const rowData = {
                id: 1,
                value: 'foo'
            };

            const table = mount(
                <table>
                    <tbody>
                    <tr>
                        <CheckboxColumnComponent
                            rowData={rowData}
                            idx="id"
                            onChange={mockAction}
                        />
                    </tr>
                    </tbody>
                </table>
            );

            expect(table.find('td').find('input[type="checkbox"]').exists()).toBe(true);

            table.find('td').find('input[type="checkbox"]').simulate('change');

            expect(mockAction.mock.calls.length).toBe(1);
            expect(mockAction.mock.calls[0][0].target.value).toBe('1');
        });
        it('should render a checkbox column with a custom classname', () => {
            const rowData = {
                id: 1,
                value: 'foo'
            };

            const table = mount(
                <table>
                    <tbody>
                    <tr>
                        <CheckboxColumnComponent
                            rowData={rowData}
                            idx="id"
                            onChange={mockAction}
                            className="test_class"
                        />
                    </tr>
                    </tbody>
                </table>
            );

            expect(table.find('td').hasClass('test_class')).toBe(true);
        });
    });
});