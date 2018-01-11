import React from 'react'
import {shallow} from 'enzyme'
import EditableColumnComponent from '../EditableColumnComponent'
import BooleanColumn from '../../BooleanColumn'
import EditContainer from '../EditContainer'
import BooleanWithNull from '../../../formComponents/BooleanWithNull'

describe('components', () => {
    describe('EditableColumnComponent', () => {
        it('should render normal column if row is not in edit mode', () => {
            const normalColumn = shallow(
                <EditableColumnComponent
                    cellInEdit={false}
                    rowInEdit={false}
                    name="test"
                    component={BooleanColumn}
                    formComponent={BooleanWithNull}
                />
            );

            expect(normalColumn.find(BooleanColumn).length).toBe(1);
            expect(normalColumn.find(EditContainer).length).toBe(0);
        });
        it('should render normal column with extra class if row is not in edit mode and value has changed', () => {
            const normalColumn = shallow(
                <EditableColumnComponent
                    cellInEdit={false}
                    rowInEdit={false}
                    name="test"
                    component={BooleanColumn}
                    formComponent={BooleanWithNull}
                    hasValueChanged={true}
                />
            );

            expect(normalColumn.find(BooleanColumn).length).toBe(1);
            expect(normalColumn.find(BooleanColumn).prop('className')).toEqual({td: 'text-success'});
        });
        it('should render column with form if row is in edit mode', () => {
            const normalColumn = shallow(
                <EditableColumnComponent
                    cellInEdit={false}
                    rowInEdit={true}
                    name="test"
                    component={BooleanColumn}
                    formComponent={BooleanWithNull}
                    editRoute="http://localhost"
                    onClick={() => {}}
                />
            );

            expect(normalColumn.find(BooleanColumn).length).toBe(0);
            expect(normalColumn.find(EditContainer).length).toBe(1);
        });
        it('should render nothing if row is not in edit mode and no component is given', () => {
            const normalColumn = shallow(
                <EditableColumnComponent
                    cellInEdit={false}
                    rowInEdit={false}
                    name="test"
                    formComponent={BooleanWithNull}
                />
            );

            expect(normalColumn.find(BooleanColumn).length).toBe(0);
            expect(normalColumn.find(EditContainer).length).toBe(0);
        });
    });
});