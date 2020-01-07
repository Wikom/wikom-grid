/**
 * Created by rouven on 01.03.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import Symbol from '@wikom/react-symbol'
import Conditional from '@wikom/react-conditional'

const GridAction = ({symbol, action}) =>
    <a onClick={action}>
        <Symbol symbol={symbol}/>
    </a>;

const GridActionWrapper = ({condition, ...props}) =>
    <Conditional condition={condition} {...props} passProps={true}>
        <GridAction/>
    </Conditional>;

GridActionWrapper.defaultProps = {
    condition: () => true
};

GridActionWrapper.propTypes = {
    symbol: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object]).isRequired,
    action: PropTypes.func.isRequired,
    condition: PropTypes.func
};

export default GridActionWrapper;