import React from 'react'
import onClickOutside from 'react-onclickoutside'

const Checkbox = ({input}) =>
    <label>
        <input
            {...input}
            type="checkbox"
            value="1"
            checked={input.value === '1'}
            onChange={evt => input.onChange(evt.target.checked ? '1' : '0')}
        />
        ja
    </label>;

export {Checkbox as RawCheckbox};
export default onClickOutside(Checkbox, {
    handleClickOutside: instance => evt => instance.props.input.onBlur()
})