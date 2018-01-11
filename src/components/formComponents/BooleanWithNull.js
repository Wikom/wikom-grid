import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import onClickOutside from 'react-onclickoutside'

const BooleanWithNull = ({input, withNull}) => {
    const isTrue = [true, 'true', 1, '1', 'j', 'J'].indexOf(input.value) !== -1;
    const isFalse = withNull === false
        ? isTrue === false
        : [false, 'false', 0, '0', 'n', 'N'].indexOf(input.value) !== -1;
    const className = {
        indeterminateCheckbox: true,
        'form-control': true,
        checked: isTrue,
        unchecked: isFalse,
        indeterminate: withNull && !isTrue && !isFalse
    };
    const changeValue = evt => input.onChange(isTrue ? '0' : (isFalse && withNull ? '-1' : '1'));

    return (
        <div className="form-group">
            <fieldset>
                <input
                    type="hidden"
                    name={input.name}
                    value={input.value}
                />
                <div
                    onClick={changeValue}
                    className={classnames(className)}
                />
            </fieldset>
        </div>
    );
};

BooleanWithNull.defaultProps = {
    withNull: true
};

BooleanWithNull.propTypes = {
    withNull: PropTypes.bool
};

export {BooleanWithNull as RawBooleanWithNull};
export default onClickOutside(BooleanWithNull, {
    handleClickOutside: instance => evt => instance.props.input.onBlur()
})
