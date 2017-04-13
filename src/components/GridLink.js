/**
 * Created by rouven on 01.03.17.
 */

import React, {PropTypes} from 'react'
import {Link} from 'react-router-dom'
import Symbol from 'react-symbol'

const GridLink = ({symbol, to}) =>
    <Link to={to}>
        <Symbol symbol={symbol}/>
    </Link>;

GridLink.propTypes = {
    symbol: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object]).isRequired,
    to: PropTypes.string.isRequired
};

export default GridLink;