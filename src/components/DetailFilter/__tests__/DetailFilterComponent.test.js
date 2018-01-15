import React from 'react'
import {shallow} from 'enzyme'
import DetailFilterComponent from '../DetailFilterComponent'
import Filter from '../../Filter'

describe('components', () => {
    describe('DetailFilterComponent', () => {
        it('should render nothing if withDetailFilter is false', () => {
            const component  = shallow(<DetailFilterComponent name="test" grid="test" withDetailFilter={false}/>);

            expect(component.find(Filter).length).toBe(0);
        });

        it('should render filter component if withDetailFilter is true', () => {
            const component  = shallow(<DetailFilterComponent name="test" grid="test" withDetailFilter={true}/>);

            expect(component.find(Filter).length).toBe(1);
        });
    });
});
