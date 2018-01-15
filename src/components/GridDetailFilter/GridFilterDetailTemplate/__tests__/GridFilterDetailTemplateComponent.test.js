import React from 'react'
import {shallow} from 'enzyme'
import GridFilterDetailTemplateComponent from '../GridFilterDetailTemplateComponent'

describe('components', () => {
    describe('GridFilterDetailTemplateComponent', () => {
        it('should render normale grid filter if withDetailFilter is false', () => {
            const component = shallow(<GridFilterDetailTemplateComponent withDetailFilter={false}/>);

            expect(component.html()).toMatch(/Detailfilter anzeigen/);
        });

        it('should render detail grid filter if withDetailFilter is true', () => {
            const component = shallow(<GridFilterDetailTemplateComponent withDetailFilter={true}/>);

            expect(component.html()).toMatch(/Detailfilter ausblenden/);
        });
    });
});