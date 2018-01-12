import React from 'react'
import DataProvider from 'wikom-data'

const ConnectedGridComponent = ({grid, url, force, children, ...rest}) =>
    <DataProvider name={grid} grid={grid} url={url} force={force} {...rest}>
        {children}
    </DataProvider>;

export default ConnectedGridComponent