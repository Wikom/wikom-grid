# wikom-grid

wikom-grid offers a simple way to render data in tables,  
provides a simple way to load data from server, includes a pagination and table-sorter.


## Installation

Add wikom-grid to your js project with yarn:

```javascript
yarn add git+https://github.com/Wikom/wikom-grid.git
```

or with npm:
```javascript
npm install --save git+https://github.com/Wikom/wikom-grid.git
```
Remember to include all dependencies as well. 

### important:
For using wikom-grid,
 don't forget to add gridReducer to your rootReducer:

```javascript
// rootReducer.js
import {gridReducer} from 'wikom-grid'

 const rootReducer = combineReducers({
    grid: gridReducer,
    // other reducers
});
```

## GridComponent basis components
Both form components, Form and SimpleForm [...]

### GridComponent

| property (*required)| type | description |
|---|---|---|
| grid* | string | identifies form for state keys |
| data* | array | data that will be displayed |
| tableClassName | string | className for table-tag <br/> <br/>default:*"table table-striped table-hover table-bordered table-condensed"* |

### ConnectedGrid

| property (*required)| type | description |
|---|---|---|
| grid* | string | identifies form for state keys |
| baseUrl* | string | route for data |

### Columns
Placed inside GridComponent - Children will be rendered as columns (from GridComponent data)

### grid components usage

```javascript
import React from 'react'
import GridComponent, {ConnectedGrid, Columns, ColTypes} from 'wikom-grid'

const {Column, DateColumn} = ColTypes;

/* grid is forwarded from ConnectedGrid,
   data is provided from ConnectedGrid 
   
   exclusively displayed for example only. ...props would do it
   */
const Inner = ({grid, data, ...props}) =>
    <GridComponent grid={grid} data={data} {...props}>
        <Columns>
            <Column name="Name" idx="name"/>
            <DateColumn name="From" idx="from"/>
        </Columns>
    </GridComponent>;
    
const MyConnectedGrid = () =>
        <ConnectedGrid
            grid="my-grid"
            baseUrl="/foo/bar"
        >
            <Inner {...props}/>
        </ConnectedGrid>;

export default MyConnectedGrid;
```

## Column Types