import React from 'react'
import {shallow, mount} from 'enzyme'
import Checkbox, {RawCheckbox} from '../Checkbox'

describe('components', () => {
    describe('Checkbox', () => {
        it('should render Checkbox form component with true value', () => {
            const input = {
                name: 'test',
                value: '1'
            };
            const component = shallow(<RawCheckbox input={input}/>);

            expect(component.find('input').prop('checked')).toBe(true);
        });

        it('should render Checkbox form component with false value', () => {
            const input = {
                name: 'test',
                value: ''
            };
            const component = shallow(<RawCheckbox input={input}/>);

            expect(component.find('input').prop('checked')).toBe(false);
        });

        it('should fire change if value changes from 1 to 0', () => {
            const onChange = jest.fn();
            const input = {
                name: 'test',
                value: '1',
                onChange: onChange
            };
            const component = shallow(<RawCheckbox input={input}/>);

            component.find('input').simulate('change', {target: {checked: false}});

            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenCalledWith('0');
        });

        it('should fire change if value changes from 0 to 1', () => {
            const onChange = jest.fn();
            const input = {
                name: 'test',
                value: '0',
                onChange: onChange
            };
            const component = shallow(<RawCheckbox input={input}/>);

            component.find('input').simulate('change', {target: {checked: true}});

            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenCalledWith('1');
        });

        it('should fire outside click handler', () => {
            const onBlur = jest.fn();

            const component = mount(<Checkbox input={{onBlur: onBlur}}/>);
            component.find(Checkbox).node.__outsideClickHandler();

            expect(onBlur.mock.calls.length).toBe(1);
        });
    });
});