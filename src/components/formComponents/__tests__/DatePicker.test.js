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

            component.find(Picker).prop('onChange')(moment.utc('2001-01-01', 'YYYY-MM-DDD'), {});

            expect(onChange).toHaveBeenCalledWith('2001-01-01', {});

            component.find(Picker).prop('onChange')(null, {});

            expect(onChange).toHaveBeenCalledWith('', {});
        });

        it('should render DatePicker component without date', () => {
            const onChange = jest.fn();
            const input = {
                value: '',
                onChange: onChange
            };
            const component = shallow(<DatePicker input={input}/>);

            expect(component.find(Picker).prop('selected')).toEqual(null);

            component.find(Picker).prop('onChange')(moment.utc('2001-01-01', 'YYYY-MM-DDD'), {});

            expect(onChange).toHaveBeenCalledWith('2001-01-01', {});

            component.find(Picker).prop('onChange')(null, {});

            expect(onChange).toHaveBeenCalledWith('', {});
        });
    });
});