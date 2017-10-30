import React from 'react'
import {shallow} from 'enzyme'
import Columns from "../Columns";

describe('components', () => {
    describe('Columns', () => {
        it('should render nothing', () => {
            const columns = shallow(
                <Columns/>
            );

            expect(columns.html()).toBe(null);
        });
    });
});