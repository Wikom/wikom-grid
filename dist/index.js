!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("prop-types"),require("react-redux"),require("with-tooltip"),require("react-loading"),require("react-pager"),require("react-router-redux"),require("query-string"),require("wikom-data"),require("find-in-object"),require("react-symbol"),require("react-router-dom"),require("redux-form")):"function"==typeof define&&define.amd?define("wikomGrid",["react","prop-types","react-redux","with-tooltip","react-loading","react-pager","react-router-redux","query-string","wikom-data","find-in-object","react-symbol","react-router-dom","redux-form"],t):"object"==typeof exports?exports.wikomGrid=t(require("react"),require("prop-types"),require("react-redux"),require("with-tooltip"),require("react-loading"),require("react-pager"),require("react-router-redux"),require("query-string"),require("wikom-data"),require("find-in-object"),require("react-symbol"),require("react-router-dom"),require("redux-form")):e.wikomGrid=t(e.react,e["prop-types"],e["react-redux"],e["with-tooltip"],e["react-loading"],e["react-pager"],e["react-router-redux"],e["query-string"],e["wikom-data"],e["find-in-object"],e["react-symbol"],e["react-router-dom"],e["redux-form"])}(this,function(e,t,r,n,a,u,l,i,o,d,c,f,s){return function(e){function t(n){if(r[n])return r[n].exports;var a=r[n]={exports:{},id:n,loaded:!1};return e[n].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.gridReducer=t.Filter=t.GridFilter=t.GridLink=t.GridAction=t.ColTypes=t.Column=t.Columns=t.ConnectedGrid=t.Grid=void 0;var u=r(1),l=a(u),i=r(18),o=a(i),d=r(5),c=a(d),f=r(20),s=n(f),p=r(25),m=a(p),g=r(27),y=a(g),v=r(34),b=a(v),h=r(36),_=a(h),O=r(37),E=a(O);t.default=l.default,t.Grid=l.default,t.ConnectedGrid=o.default,t.Columns=c.default,t.Column=s.default,t.ColTypes=s,t.GridAction=m.default,t.GridLink=y.default,t.GridFilter=b.default,t.Filter=_.default,t.gridReducer=E.default},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),d=r(2),c=n(d),f=r(3),s=n(f),p=r(4),m=r(5),g=n(m),y=r(6),v=n(y),b=r(7),h=n(b),_=r(9),O=n(_),E=r(10),x=n(E),j=r(11),w=n(j),P=r(14),C=r(13),S=n(C),N=function(e){function t(e){a(this,t);var r=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r._columns=r.createColumns(e.children),r._rows=r.buildRows(e),r}return l(t,e),o(t,[{key:"componentDidMount",value:function(){this.props.initializeGrid(this.props.grid),this.props.changeData(this.props.grid,this.props.data)}},{key:"componentWillReceiveProps",value:function(e){this.props.grid!==e.grid&&(this.props.destroyGrid(this.props.grid),this.props.initializeGrid(e.grid),this._columns=this.createColumns(e.children)),JSON.stringify(this.props.data)!==JSON.stringify(e.data)&&(this.props.changeData(e.grid,e.data),this._rows=this.buildRows(e))}},{key:"componentWillUnmount",value:function(){this.props.destroyGrid(this.props.grid)}},{key:"createColumns",value:function(e){var t=[];return c.default.Children.forEach(e,function(e){c.default.isValidElement(e)&&e.type===g.default&&c.default.Children.forEach(e.props.children,function(e){c.default.isValidElement(e)&&t.push(e)})}),t}},{key:"buildRows",value:function(e){var t=this,r=e.grid,n=e.isLoading,a=e.data;return n?c.default.createElement(O.default,{colSpan:this._columns.length},c.default.createElement(x.default,null)):a&&a.length>0?a.map(function(e){return c.default.createElement(v.default,{rowData:e,key:e.id,grid:r},t._columns)}):c.default.createElement(O.default,{colSpan:this._columns.length},"Keine Ergebnisse vorhanden")}},{key:"render",value:function(){var e=this.props,t=e.grid,r=e.pagination,n=e.handleSort,a=e.activeSort,u=e.actions,l=r&&t,o=c.default.createElement(h.default,{grid:t,columns:this._columns,handleSort:n,activeSort:a});return c.default.createElement("div",{className:"grid-view"},c.default.createElement("div",{className:"box"},c.default.createElement("div",{className:"box-body"},u,l?c.default.createElement(w.default,i({grid:t},r)):null,c.default.createElement("div",{className:"row"},c.default.createElement("div",{className:"col-md-12"},c.default.createElement("div",{className:"table-grid"},c.default.createElement("div",{className:"table-responsive"},c.default.createElement("table",{className:"table table-striped table-hover table-bordered table-condensed"},c.default.createElement("thead",null,o),c.default.createElement("tbody",null,this._rows)))))))))}}]),t}(c.default.Component);N.propTypes={children:s.default.node,data:s.default.arrayOf(s.default.object),isLoading:s.default.bool.isRequired,pagination:s.default.shape(S.default),grid:s.default.string.isRequired,initializeGrid:s.default.func.isRequired,destroyGrid:s.default.func.isRequired};var T=function(e){return{initializeGrid:function(t){return e((0,P.initializeGrid)(t))},destroyGrid:function(t){return e((0,P.destroyGrid)(t))},changeData:function(t,r){return e((0,P.changeData)(t,r))}}};t.default=(0,p.connect)(null,T)(N)},function(t,r){t.exports=e},function(e,r){e.exports=t},function(e,t){e.exports=r},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(2),u=(n(a),function(){return null});t.default=u},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(2),u=n(a),l=r(3),i=n(l),o=function(e){var t=e.children,r=e.grid,n=e.rowData;return u.default.createElement("tr",null,u.default.Children.map(t,function(e){return u.default.cloneElement(e,{grid:r,rowData:n})}))};o.propTypes={children:i.default.node.isRequired,grid:i.default.string,rowData:i.default.object.isRequired},t.default=o},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u=r(2),l=n(u),i=r(3),o=n(i),d=r(8),c=n(d),f=function(e){var t=e.grid,r=e.columns,n=e.activeSort,u=e.handleSort;return l.default.createElement("tr",null,r.map(function(e,r){var i=e.props,o=i.name,d=i.className,f=i.tooltip,s=i.idx,p=i.ThComponent,m=i.sortable,g=void 0===m||m;if(p)return l.default.createElement(p,{grid:t,key:r,idx:s});var y=[],v={key:r},b=null;switch("undefined"==typeof d?"undefined":a(d)){case"object":d.th&&y.push(d.th);break;case"string":y.push(d)}return n&&n.indexOf(s)!==-1&&(b=0===n.indexOf(s)?"asc":"desc",y.push("sort-"+b)),g===!0&&"function"==typeof u&&(v.onClick=function(){return u(s,"asc"!==b)},y.push("sortable")),v.className=y.join(" "),l.default.createElement("th",v,l.default.createElement("span",{className:"table-head-title"},(0,c.default)(f)(o)))}))};f.propTypes={columns:o.default.node},t.default=f},function(e,t){e.exports=n},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(2),u=n(a),l=r(3),i=n(l),o=function(e){var t=e.colSpan,r=e.children;return u.default.createElement("tr",{key:"1"},u.default.createElement("td",{colSpan:t,className:"text-center"},r))};o.propTypes={colSpan:i.default.number.isRequired,children:i.default.node},t.default=o},function(e,t){e.exports=a},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},u=r(2),l=n(u),i=r(3),o=n(i),d=r(4),c=r(12),f=n(c),s=r(13),p=n(s),m=r(14),g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[5,10,20,50];return e.map(function(e,t){return l.default.createElement("option",a({},e,{key:"psso_"+t}),e)})},y=function(e){var t=e.grid,r=e.currentPage,n=e.pageCount,a=e.perPage,u=e.totalCount,i=e.handlePageChanged,o=e.handlePageSizeChanged;return l.default.createElement("div",{className:"row grid-before-table"},l.default.createElement("div",{className:"col-md-3"},l.default.createElement("div",{className:"grid-filter",style:{lineHeight:"28px",color:"#777"}},u," Zeile(n)")),l.default.createElement("div",{className:"col-md-6"},l.default.createElement("div",{className:"text-center"},l.default.createElement(f.default,{total:n,current:r-1,titles:{first:"Erste Seite",prev:"«",prevSet:"...",nextSet:"...",next:"»",last:"Letzte Seite"},visiblePages:5,onPageChanged:function(e){return i(e,t)}}))),l.default.createElement("div",{className:"col-md-3 text-right"},l.default.createElement("div",{className:"grid-filter"},l.default.createElement("div",{className:"form-inline"},l.default.createElement("label",{htmlFor:"pagesizeSelect"},"Einträge pro Seite:"),l.default.createElement("select",{value:a,name:"pagesizeSelect",className:"input-sm form-control",onChange:function(e){return o(e,t)}},g())))))};y.defaultProps={pageCount:0},y.propTypes=Object.assign({grid:o.default.string.isRequired},p.default);var v=function(e){return{handlePageSizeChanged:function(t,r){return e((0,m.changePageSize)(t,r))},handlePageChanged:function(t,r){return e((0,m.changePage)(t,r))}}};t.default=(0,d.connect)(null,v)(y)},function(e,t){e.exports=u},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(3),u=n(a);t.default={currentPage:u.default.number,pageCount:u.default.number,perPage:u.default.number,totalCount:u.default.number}},function(e,t,r){"use strict";function n(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.changeSelection=t.changeData=t.destroyGrid=t.initializeGrid=t.changeSort=t.changePageSize=t.changePage=t.applyFilter=void 0;var u=r(15),l=r(16),i=a(l),o=r(17),d=n(o),c=function(e){var t=e.name,r=e.param,n=e.value;return function(e,a){var l=a().routing.location,o=l.pathname,d=i.default.parse(l.search),c=d.grid?JSON.parse(d.grid):{};return c[t]||(c[t]={}),null!==n?c[t][r]=n:delete c[t][r],d.grid=JSON.stringify(c),e((0,u.push)({pathname:o,search:i.default.stringify(d)}))}};t.applyFilter=function(e,t){return c({name:t,param:"filter",value:e})},t.changePage=function(e,t){return c({name:t,param:"currentPage",value:e+1})},t.changePageSize=function(e,t){return c({name:t,param:"pageSize",value:Number(e.target.value)})},t.changeSort=function(e,t){var r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return c({name:e,param:"sort",value:(r?"":"-")+t})},t.initializeGrid=function(e){return{type:d.INITIALIZE,name:e}},t.destroyGrid=function(e){return{type:d.DESTROY,name:e}},t.changeData=function(e,t){return{type:d.DATA_CHANGED,name:e,data:t}},t.changeSelection=function(e,t){return{type:d.SELECTION_CHANGED,name:e,checked:t.checked,value:t.value}}},function(e,t){e.exports=l},function(e,t){e.exports=i},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="@@wikom-grid/";t.INITIALIZE=r+"INITIALIZE",t.DESTROY=r+"DESTROY",t.DATA_CHANGED=r+"DATA_CHANGED",t.SELECTION_CHANGED=r+"SELECTION_CHANGED"},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},l=r(2),i=n(l),o=r(3),d=n(o),c=r(4),f=r(16),s=n(f),p=r(19),m=n(p),g=r(14),y=function(e){var t=e.grid,r=e.url,n=e.force,l=e.children,o=a(e,["grid","url","force","children"]);return i.default.createElement(m.default,u({name:t,grid:t,url:r,force:n},o),l)},v=function(e,t){var r=t.grid,n=t.baseUrl,a=n,u=null;if(e.grid[r]){var l={};if(e.grid[r].filter)for(var i in e.grid[r].filter)l["filter["+i+"]"]=e.grid[r].filter[i];var o=e.grid[r].pagination;o&&o.pageSize&&(l["per-page"]=o.pageSize),o&&o.currentPage&&(l.page=o.currentPage),e.grid[r].sort&&(u=e.grid[r].sort,l.sort=e.grid[r].sort),Object.keys(l).length>0&&(a+="?"+s.default.stringify(l))}return{url:a,activeSort:u}},b=function(e,t){var r=t.grid;return{handleSort:function(t,n){return e((0,g.changeSort)(r,t,n))}}},h=(0,c.connect)(v,b)(y);h.defaultProps={force:!0},h.propTypes={grid:d.default.string.isRequired,baseUrl:d.default.string.isRequired,force:d.default.bool},t.default=h},function(e,t){e.exports=o},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.HtmlColumn=t.CheckboxColumn=t.SymbolColumn=t.OptionsColumn=t.DateColumn=t.ActionColumn=t.BaseColumn=t.Column=void 0;var a=r(21),u=n(a),l=r(23),i=n(l),o=r(24),d=n(o),c=r(29),f=n(c),s=r(30),p=n(s),m=r(31),g=n(m),y=r(32),v=n(y),b=r(33),h=n(b);t.default=u.default,t.Column=u.default,t.BaseColumn=i.default,t.ActionColumn=d.default,t.DateColumn=f.default,t.OptionsColumn=p.default,t.SymbolColumn=g.default,t.CheckboxColumn=v.default,t.HtmlColumn=h.default},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}Object.defineProperty(t,"__esModule",{value:!0});var u=r(2),l=n(u),i=r(3),o=n(i),d=r(22),c=n(d),f=r(23),s=n(f),p=function(e){var t=(e.name,e.rowData),r=e.idx,n=a(e,["name","rowData","idx"]);return l.default.createElement(s.default,n,(0,c.default)(r,t))};p.propTypes={name:o.default.string.isRequired,rowData:o.default.object,idx:o.default.oneOfType([o.default.number,o.default.string])},t.default=p},function(e,t){e.exports=d},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u=r(2),l=n(u),i=r(3),o=n(i),d=function(e){var t=e.className,r=e.children,n={};switch("undefined"==typeof t?"undefined":a(t)){case"object":t.td&&(n.className=t.td);break;case"string":n.className=t}return l.default.createElement("td",n,r)};d.propTypes={className:o.default.oneOfType([o.default.string,o.default.object]),children:o.default.node},t.default=d},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}Object.defineProperty(t,"__esModule",{value:!0});var u=r(2),l=n(u),i=r(3),o=n(i),d=r(22),c=n(d),f=r(25),s=n(f),p=r(27),m=n(p),g=r(23),y=n(g),v=function(e,t,r){return l.default.Children.map(e,function(e){return l.default.isValidElement(e)&&e.type===s.default?l.default.cloneElement(e,{action:function(){return e.props.action((0,c.default)(r,t))}}):l.default.isValidElement(e)&&e.type===m.default?l.default.cloneElement(e,{to:e.props.to+"/"+(0,c.default)(r,t)}):void 0})},b=function(e){var t=(e.name,e.rowData),r=e.idx,n=e.children,u=a(e,["name","rowData","idx","children"]),i=v(n,t,r);return l.default.createElement(y.default,u,i)};b.defaultProps={idx:"id",sortable:!1,className:"text-nowrap"},b.propTypes={name:o.default.string.isRequired,rowData:o.default.object,idx:o.default.oneOfType([o.default.number,o.default.string]),children:o.default.node,sortable:o.default.bool},t.default=b},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(2),u=n(a),l=r(3),i=n(l),o=r(26),d=n(o),c=function(e){var t=e.symbol,r=e.action;return u.default.createElement("a",{onClick:r},u.default.createElement(d.default,{symbol:t}))};c.propTypes={symbol:i.default.oneOfType([i.default.string,i.default.object]).isRequired,action:i.default.func.isRequired},t.default=c},function(e,t){e.exports=c},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(2),u=n(a),l=r(28),i=r(26),o=n(i),d=function(e){var t=e.symbol,r=e.to;return u.default.createElement(l.Link,{to:r},u.default.createElement(o.default,{symbol:t}))};d.propTypes={symbol:a.PropTypes.oneOfType([a.PropTypes.string,a.PropTypes.object]).isRequired,to:a.PropTypes.string.isRequired},t.default=d},function(e,t){e.exports=f},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}Object.defineProperty(t,"__esModule",{value:!0});var u=r(2),l=n(u),i=r(3),o=n(i),d=r(22),c=n(d),f=r(23),s=n(f),p=function(e){var t=(e.name,e.rowData),r=e.idx,n=a(e,["name","rowData","idx"]);return l.default.createElement(s.default,n,new Date((0,c.default)(r,t)).toLocaleDateString())};p.propTypes={name:o.default.string.isRequired,rowData:o.default.object,idx:o.default.oneOfType([o.default.number,o.default.string])},t.default=p},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}Object.defineProperty(t,"__esModule",{value:!0});var u=r(2),l=n(u),i=r(3),o=n(i),d=r(22),c=n(d),f=r(23),s=n(f),p=function(e){var t=(e.name,e.rowData),r=e.idx,n=e.options,u=a(e,["name","rowData","idx","options"]);return l.default.createElement(s.default,u,n[(0,c.default)(r,t)])};p.propTypes={name:o.default.string.isRequired,rowData:o.default.object,idx:o.default.oneOfType([o.default.number,o.default.string]),options:o.default.object.isRequired},t.default=p},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}Object.defineProperty(t,"__esModule",{value:!0});var u=r(2),l=n(u),i=r(3),o=n(i),d=r(22),c=n(d),f=r(26),s=n(f),p=r(23),m=n(p),g=function(e){var t=(e.name,e.rowData),r=e.idx,n=e.symbols,u=a(e,["name","rowData","idx","symbols"]),i=n[(0,c.default)(r,t)];return l.default.createElement(m.default,u,i?l.default.createElement(s.default,{symbol:i}):null)};g.propTypes={name:o.default.string.isRequired,rowData:o.default.object,idx:o.default.oneOfType([o.default.number,o.default.string]),symbols:o.default.object.isRequired},t.default=g},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},l=r(2),i=n(l),o=r(3),d=n(o),c=r(4),f=r(22),s=n(f),p=r(23),m=n(p),g=r(14),y=function(e){var t=e.rowData,r=e.idx,n=e.checked,l=e.onChange,o=a(e,["rowData","idx","checked","onChange"]);return i.default.createElement(m.default,u({},o,{className:"text-center"}),i.default.createElement("input",{type:"checkbox",name:"row-is-selected",value:(0,s.default)(r,t),checked:n,onChange:l}))};y.defaultProps={checked:!1},y.propTypes={rowData:d.default.object,idx:d.default.oneOfType([d.default.number,d.default.string]),checked:d.default.bool};var v=function(e,t){var r=t.grid,n=t.idx,a=t.rowData;return{checked:e.grid[r]&&e.grid[r].selection&&e.grid[r].selection.indexOf((0,s.default)(n,a))!==-1}},b=function(e,t){var r=t.grid;return{onChange:function(t){return e((0,g.changeSelection)(r,t.target))}}},h=(0,c.connect)(v,b)(y),_=function(e){var t=(e.grid,e.checked),r=e.onChange,n=e.allValues;return i.default.createElement("th",{className:"text-center"},i.default.createElement("input",{type:"checkbox",name:"row-is-selected",value:n,checked:t,onChange:r}))};_.defaultProps={checked:!1};var O=function(e,t){var r=t.grid,n=t.idx;return{allValues:e.grid[r]&&e.grid[r].data?JSON.stringify(e.grid[r].data.map(function(e){return e[n]})):"",checked:(e.grid[r]&&e.grid[r].data&&e.grid[r].data.length>0&&e.grid[r].data.length===e.grid[r].selection.length)===!0}},E=function(e,t){var r=t.grid;return{onChange:function(t){return e((0,g.changeSelection)(r,t.target))}}};h.defaultProps={idx:"id",ThComponent:(0,c.connect)(O,E)(_)},t.default=h},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}Object.defineProperty(t,"__esModule",{value:!0});var u=r(2),l=n(u),i=r(3),o=n(i),d=r(22),c=n(d),f=r(23),s=n(f),p=function(e){var t=(e.name,e.rowData),r=e.idx,n=a(e,["name","rowData","idx"]);return l.default.createElement(s.default,n,l.default.createElement("span",{dangerouslySetInnerHTML:{__html:(0,c.default)(r,t)}}))};p.propTypes={name:o.default.string.isRequired,rowData:o.default.object,idx:o.default.oneOfType([o.default.number,o.default.string])},t.default=p},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}Object.defineProperty(t,"__esModule",{value:!0});var u=r(2),l=n(u),i=r(4),o=r(14),d=r(35),c=r(26),f=n(c),s=r(36),p=n(s),m=function(e){var t=e.handleSubmit,r=e.onSubmit,n=e.clearFilter,u=e.children;a(e,["handleSubmit","onSubmit","clearFilter","children"]);return l.default.createElement("form",{onSubmit:t(r)},u instanceof Array&&u.length>0?l.default.createElement("div",{className:"box box-default box-solid grid-search"},l.default.createElement("div",{className:"box-header with-border"},l.default.createElement("h3",{className:"box-title"},"Filter"),l.default.createElement("div",{className:"box-tools pull-right"},l.default.createElement("button",{type:"button",onClick:n,className:"btn btn-xs btn-default btn-filterReset"},l.default.createElement(f.default,{symbol:"undo"})," Filter zurücksetzen"))),l.default.createElement("div",{className:"box-body"},l.default.createElement("div",{id:"filter_row",className:"row"},u),l.default.createElement("div",{id:"filter_apply_row",className:"filterapply-wrapper"},l.default.createElement("button",{type:"submit",className:"btn btn-sm btn-primary"},l.default.createElement(f.default,{symbol:"filter"}),"Filter anwenden")))):"")},g=(0,d.reduxForm)({enableReinitialize:!0})(m),y=function(e,t){return{form:t.grid+"Filter",initialValues:Object.assign({},t.initialValues,e.grid[t.grid]&&e.grid[t.grid].filter),children:l.default.Children.map(t.children,function(r){return l.default.isValidElement(r)&&r.type===p.default&&e.grid[t.grid]&&e.grid[t.grid].filter[r.props.name]?l.default.cloneElement(r,{className:r.props.className+" filter_active"}):r})}},v=function(e,t){return{onSubmit:function(r){return e((0,o.applyFilter)(r,t.grid))},clearFilter:function(){return e((0,o.applyFilter)(null,t.grid))}}};t.default=(0,i.connect)(y,v)(g)},function(e,t){e.exports=s},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(2),u=n(a),l=r(3),i=n(l),o=r(4),d=function(e){var t=e.children,r=e.className;return u.default.createElement("div",{className:r},t)},c=function(e,t){return{className:t.className}},f=(0,o.connect)(c)(d);f.defaultProps={className:"col-sm-6 col-md-4 col-lg-3 form-group filter-element"},f.propTypes={name:i.default.string.isRequired,children:i.default.node,className:i.default.string},t.default=f},function(e,t,r){"use strict";function n(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=r(15),l=r(35),i=r(16),o=a(i),d=r(17),c=n(d),f=function(){return{data:[],filter:{},pagination:{},selection:[],sort:null}},s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1];switch(t.type){case l.actionTypes.INITIALIZE:if(t.meta&&t.meta.form&&t.meta.form.indexOf("Filter")!==-1){var r=Object.assign({},e),n=t.meta.form.slice(0,t.meta.form.indexOf("Filter"));return r[n]||(r[n]=f()),r[n].filter=t.payload||{},r}return e;case c.INITIALIZE:var a=Object.assign({},e);return a[t.name]||(a[t.name]=f()),a;case c.DESTROY:var i=Object.assign({},e);return i[t.name]&&delete i[t.name],i;case u.LOCATION_CHANGE:var d=Object.assign({},e),s=o.default.parse(t.payload.search),p=s.grid?JSON.parse(s.grid):{};for(var m in p){var g=p[m];d[m]||(d[m]=f()),d[m].data=[],d[m].selection=[],d[m].pagination.pageSize=g.pageSize||null,d[m].pagination.currentPage=g.currentPage||1,d[m].sort=g.sort||null,d[m].filter=g.filter||{}}return d;case c.DATA_CHANGED:var y=Object.assign({},e);return y[t.name]||(y[t.name]=f()),y[t.name].data=t.data,y;case c.SELECTION_CHANGED:var v=Object.assign({},e);v[t.name]||(v[t.name]=f());var b=[].concat(JSON.parse(t.value));return t.checked?v[t.name].selection=v[t.name].selection.concat(b).filter(function(e,t,r){return r.indexOf(e)===t}):v[t.name].selection=v[t.name].selection.filter(function(e,t,r){return b.indexOf(e)===-1}),v;default:return e}};t.default=s}])});
//# sourceMappingURL=index.js.map