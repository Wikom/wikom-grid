/**
 * Created by rouven on 01.03.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Symbol from '@wikom/react-symbol'
import Conditional from '@wikom/react-conditional'

const GridLink = ({symbol, to}) =>
    <Link to={to}>
        <Symbol symbol={symbol}/>
    </Link>;

const GridLinkWrapper = ({condition, ...props}) =>
    <Conditional condition={condition} {...props} passProps={true}>
        <GridLink/>
    </Conditional>;

GridLinkWrapper.defaultProps = {
    condition: () => true
};

GridLinkWrapper.propTypes = {
    symbol: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object]).isRequired,
    to: PropTypes.string.isRequired,
    condition: PropTypes.func
};

export default GridLinkWrapper;