import React from 'react'
import {shallow} from 'enzyme'
import DatePicker from '../DatePicker'
import Picker from 'react-datepicker'
import moment from 'moment'
import locale from 'moment/locale/de'

describe('components', () => {
    describe('DatePicker', () => {
        it('should render DatePicker component', () => {
            const onChange = jest.fn();
            const input = {
                value: '2000-01-01',
                onChange: onChange
            };
            const component = shallow(<DatePicker input={input}/>);
            const value = moment.utc(input.value, 'YYYY-MM-DD');

            expect(component.find(Picker).prop('selected').format('YYYY-MM-DD')).toEqual(value.format('YYYY-MM-DD'));

            component.find(Picker).prop('onChange')('2001-01-01', {});

            expect(onChange).toHaveBeenCalledWith('2001-01-01', {});

            component.find(Picker).prop('onChange')('', {});

            expect(onChange).toHaveBeenCalledWith('', {});
        });
    });
});