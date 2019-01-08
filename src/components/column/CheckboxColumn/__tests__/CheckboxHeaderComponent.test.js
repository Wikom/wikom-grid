import React from 'react'
import {mount} from 'enzyme'
import CheckboxHeaderComponent from '../CheckboxHeaderComponent'

const mockAction = jest.fn();

describe('components', () => {
    describe('CheckboxColumn', () => {
        it('should render a checkbox column', () => {
            const table = mount(
                <table>
                    <thead>
                    <tr>
                        <CheckboxHeaderComponent
                            allValues="1"
                            checked={false}
                            onChange={mockAction}
                        />
                    </tr>
                    </thead>
                </table>
            );

            expect(table.find('th').find('input[type="checkbox"]').exists()).toBe(true);

            table.find('th').find('input[type="checkbox"]').simulate('change');

            expect(mockAction.mock.calls.length).toBe(1);
            expect(mockAction.mock.calls[0][0].target.value).toBe('1');
        });

        it('should render a checkbox column with fixed width', () => {
            const table = mount(
                <table>
                    <thead>
                    <tr>
                        <CheckboxHeaderComponent
                            allValues="1"
                            checked={false}
                            onChange={mockAction}
                            cellWidth={100}
                        />
                    </tr>
                    </thead>
                </table>
            );

            expect(table.find('th div').at(0).prop('style').width).toBe(100);
        });
    });
});