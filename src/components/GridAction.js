/**
 * Created by rouven on 01.03.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import Symbol from 'react-symbol'

const GridAction = ({symbol, action}) =>
    <a onClick={action}>
        <Symbol symbol={symbol}/>
    </a>;

GridAction.propTypes = {
    symbol: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object]).isRequired,
    action: PropTypes.func.isRequired
};

export default GridAction;