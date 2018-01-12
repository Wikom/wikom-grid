import React from 'react'
import {shallow} from 'enzyme'
import Boolean from '../Boolean'
import BooleanWithNull from '../BooleanWithNull'

describe('components', () => {
    describe('Boolean', () => {
        it('should render boolean form component', () => {
            const component = shallow(<Boolean/>);

            expect(component.find(BooleanWithNull).length).toBe(1);
            expect(component.find(BooleanWithNull).prop('withNull')).toBe(false);
        });
    });
});