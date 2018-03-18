/**
 * Created by rouven on 24.02.17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import withTooltip from 'with-tooltip'

const Header = ({grid, columns, activeSort, handleSort}) =>
    <tr>
        {
            columns.map((column, key) => {
                const {name, className, tooltip, idx, ThComponent, cellWidth = false, sortable = true} = column.props;

                if (ThComponent) {
                    return <ThComponent grid={grid} name={name} key={key} idx={idx} cellWidth={cellWidth} />;
                }

                const classNames = [];
                const thProps = {
                    key
                };
                let sortOrder = null;

                switch (typeof className) {
                    case 'object':
                        if (className.th) {
                            classNames.push(className.th);
                        }
                        break;
                    case 'string':
                        classNames.push(className);
                        break;
                }

                if (activeSort && activeSort.indexOf(idx) !== -1) {
                    sortOrder = activeSort.indexOf(idx) === 0 ? 'asc' : 'desc';
                    classNames.push('sort-' + sortOrder);
                }

                if (sortable === true && typeof handleSort === 'function') {
                    thProps.onClick = () => handleSort(idx, sortOrder !== 'asc');
                    classNames.push('sortable');
                }

                thProps.className = classNames.join(' ');
                let thInner = <span className="table-head-title">{withTooltip(tooltip)(name)}</span>;
                return <th {...thProps}>
                    { cellWidth ? (<div style={{'width': cellWidth}}>{thInner}</div>) : thInner }
                </th>;
            })
        }
    </tr>;

Header.propTypes = {
    columns: PropTypes.node
};

export default Header;