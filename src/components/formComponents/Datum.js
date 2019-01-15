import React from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';

const Datum = ({input}) => {
    const handleChange = evt => {
        const value = evt.target.value;
        const valueAsMoment = value && moment(value, ['DD.MM.YYYY', 'YYYY-MM-DD', moment.ISO_8601], true);
        const valueFormatted = moment.isMoment(valueAsMoment) && valueAsMoment.isValid()
            ? valueAsMoment.format('YYYY-MM-DD')
            : value;

        return input.onChange(valueFormatted, evt);
    };

    const handleBlur = evt => {
        const value = evt.target.value;
        const valueAsMoment = value && moment(value, ['DD.MM.YYYY', 'YYYY-MM-DD', moment.ISO_8601], true);
        const valueFormatted = (moment.isMoment(valueAsMoment) && valueAsMoment.isValid())
            ? valueAsMoment.format('YYYY-MM-DD')
            : '';

        input.onChange(valueFormatted);

        return input.onBlur();
    };

    const valueAsMoment = input.value && moment(input.value, ['DD.MM.YYYY', 'YYYY-MM-DD', moment.ISO_8601], true);
    const valueFormatted = moment.isMoment(valueAsMoment) && valueAsMoment.isValid()
        ? valueAsMoment.format('DD.MM.YYYY')
        : input.value;

    return (
        <div className="input-group">
            <input
                type="hidden"
                name={input.name}
                value={input.value}
            />
            <NumberFormat
                {...input}
                name={`${input.name}_formatted`}
                value={valueFormatted}
                onChange={handleChange}
                onBlur={handleBlur}
                format="##.##.####"
                placeholder="TT.MM.JJJJ"
                mask="_"
                className="form-control"
            />
        </div>
    );
};

export default Datum;