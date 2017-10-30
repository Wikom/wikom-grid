import React from 'react'
import {shallow} from 'enzyme'
import Filter from "../Filter";

describe('components', () => {
    describe('Filter', () => {
        it('should render a container for filter children', () => {
            const filter = shallow(
                <Filter name="test_filter">
                    <div>INNER</div>
                </Filter>
            );

            expect(filter.contains('INNER')).toBe(true);
            expect(filter.props().className).toBe('col-sm-6 col-md-4 col-lg-3 form-group filter-element');
        });
    });
});