import React from 'react'
import {shallow} from 'enzyme'
import EditColumns from "../EditColumns";

describe('components', () => {
    describe('EditColumns', () => {
        it('should render nothing', () => {
            const columns = shallow(
                <EditColumns/>
            );

            expect(columns.html()).toBe(null);
        });
    });
});