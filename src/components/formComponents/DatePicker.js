import React from 'react'
import PropTypes from 'prop-types'
import Picker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

import moment from 'moment'
import locale from 'moment/locale/de'

const DatePicker = ({input, placeholder, defaultValue, dateFormat, autoFocus}) => {
    const value = input.value && moment.utc(input.value, [dateFormat, 'YYYY-MM-DD', moment.ISO_8601]) || null;
    const valueForPicker = value && value.format(dateFormat) || '';
    const handleChange = (value, evt) => {
        const formatted = value && moment.utc(value, [dateFormat, 'YYYY-MM-DD', moment.ISO_8601]);

        input.onChange(value && value.format('YYYY-MM-DD') || '', evt);
    };

    return (
        <Picker
            {...input}
            onChange={handleChange}
            locale="de-de"
            dateFormat={dateFormat}
            className="form-control"
            value={valueForPicker}
            selected={value}
            autoFocus={autoFocus}
        />
    );
};

DatePicker.defaultProps = {
    className: 'form-control',
    dateFormat: 'DD.MM.YYYY'
};

DatePicker.propTypes = {
    className: PropTypes.string,
    dateFormat: PropTypes.string
};

export default DatePicker
