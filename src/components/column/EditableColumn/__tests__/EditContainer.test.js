import React from 'react'
import {shallow} from 'enzyme'
import EditContainer from '../EditContainer'
import EditComponent from '../EditComponent'

describe('components', () => {
    describe('EditContainer', () => {
        it('should render an edit component', () => {
            const onFocus = jest.fn();
            const mockDispatch = jest.fn();
            const editContainer = shallow(
                <EditContainer
                    editRoute="http://localhost"
                    onFocus={onFocus}
                />
            );
            const editComponent = editContainer.find(EditComponent);

            expect(editComponent.length).toBe(1);

            editComponent.prop('onSubmit')({foo: 'bar'}, mockDispatch);

            expect(mockDispatch.mock.calls.length).toBe(1);

            editComponent.prop('onSubmitFail')([], mockDispatch, {status: 422, response: {body: ['validation error']}});

            expect(mockDispatch.mock.calls.length).toBe(2);

            editComponent.prop('onSubmitFail')([], mockDispatch, {status: 404, response: {body: ['not found error']}});

            expect(mockDispatch.mock.calls.length).toBe(2);
        });
    });
});