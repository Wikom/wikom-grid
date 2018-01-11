import React from 'react'
import {shallow, mount} from 'enzyme'
import BooleanWithNull, {RawBooleanWithNull} from '../BooleanWithNull'

describe('components', () => {
    describe('BooleanWithNull', () => {
        it('should render boolean form component with true value', () => {
            const input = {
                name: 'test',
                value: '1'
            };
            const component = shallow(<RawBooleanWithNull input={input}/>);

            expect(component.find('fieldset').find('input').prop('value')).toEqual('1');
            expect(component.find('fieldset').find('div').hasClass('checked')).toBe(true);
            expect(component.find('fieldset').find('div').hasClass('unchecked')).toBe(false);
            expect(component.find('fieldset').find('div').hasClass('indeterminate')).toBe(false);
        });

        it('should render boolean form component with false value', () => {
            const input = {
                name: 'test',
                value: '0'
            };
            const component = shallow(<RawBooleanWithNull input={input}/>);

            expect(component.find('fieldset').find('input').prop('value')).toEqual('0');
            expect(component.find('fieldset').find('div').hasClass('checked')).toBe(false);
            expect(component.find('fieldset').find('div').hasClass('unchecked')).toBe(true);
            expect(component.find('fieldset').find('div').hasClass('indeterminate')).toBe(false);
        });

        it('should render boolean form component without null with false value', () => {
            const input = {
                name: 'test',
                value: '0'
            };
            const component = shallow(<RawBooleanWithNull input={input} withNull={false}/>);

            expect(component.find('fieldset').find('input').prop('value')).toEqual('0');
            expect(component.find('fieldset').find('div').hasClass('checked')).toBe(false);
            expect(component.find('fieldset').find('div').hasClass('unchecked')).toBe(true);
            expect(component.find('fieldset').find('div').hasClass('indeterminate')).toBe(false);
        });

        it('should render boolean form component with null value', () => {
            const input = {
                name: 'test',
                value: '-1'
            };
            const component = shallow(<RawBooleanWithNull input={input}/>);

            expect(component.find('fieldset').find('input').prop('value')).toEqual('-1');
            expect(component.find('fieldset').find('div').hasClass('checked')).toBe(false);
            expect(component.find('fieldset').find('div').hasClass('unchecked')).toBe(false);
            expect(component.find('fieldset').find('div').hasClass('indeterminate')).toBe(true);
        });

        it('should fire change if value changes from 1 to 0', () => {
            const onChange = jest.fn();
            const input = {
                name: 'test',
                value: '1',
                onChange: onChange
            };
            const component = shallow(<RawBooleanWithNull input={input}/>);

            component.find('fieldset').find('div').simulate('click');

            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenCalledWith('0');
        });

        it('should fire change if value changes from 0 to -1', () => {
            const onChange = jest.fn();
            const input = {
                name: 'test',
                value: '0',
                onChange: onChange
            };
            const component = shallow(<RawBooleanWithNull input={input}/>);

            component.find('fieldset').find('div').simulate('click');

            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenCalledWith('-1');
        });

        it('should fire change if value changes from 0 to 1', () => {
            const onChange = jest.fn();
            const input = {
                name: 'test',
                value: '0',
                onChange: onChange
            };
            const component = shallow(<RawBooleanWithNull input={input} withNull={false}/>);

            component.find('fieldset').find('div').simulate('click');

            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenCalledWith('1');
        });

        it('should fire change if value changes from -1 to 1', () => {
            const onChange = jest.fn();
            const input = {
                name: 'test',
                value: '-1',
                onChange: onChange
            };
            const component = shallow(<RawBooleanWithNull input={input}/>);

            component.find('fieldset').find('div').simulate('click');

            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenCalledWith('1');
        });

        it('should fire outside click handler', () => {
            const onBlur = jest.fn();

            const component = mount(<BooleanWithNull input={{onBlur: onBlur}}/>);
            component.find(BooleanWithNull).node.__outsideClickHandler();

            expect(onBlur.mock.calls.length).toBe(1);
        });
    });
});