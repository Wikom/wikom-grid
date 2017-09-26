'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Grid2 = require('./Grid');

var _Grid3 = _interopRequireDefault(_Grid2);

var _Columns = require('./Columns');

var _Columns2 = _interopRequireDefault(_Columns);

var _EditColumns = require('./EditColumns');

var _EditColumns2 = _interopRequireDefault(_EditColumns);

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

var _FullRow = require('./FullRow');

var _FullRow2 = _interopRequireDefault(_FullRow);

var _reactLoading = require('react-loading');

var _reactLoading2 = _interopRequireDefault(_reactLoading);

var _reduxForm = require('redux-form');

var _wikomData = require('wikom-data');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditableGrid = function (_Grid) {
    _inherits(EditableGrid, _Grid);

    function EditableGrid(props) {
        _classCallCheck(this, EditableGrid);

        var _this = _possibleConstructorReturn(this, (EditableGrid.__proto__ || Object.getPrototypeOf(EditableGrid)).call(this, props));

        _this._rowInEdit = null;

        _this.createColumns(props.children);
        _this._rows = _this.buildRows(props);
        return _this;
    }

    _createClass(EditableGrid, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.grid !== nextProps.grid) {
                this.props.destroyGrid(this.props.grid);
                this.props.initializeGrid(nextProps.grid);

                this.createColumns(nextProps.children);
            }

            if (JSON.stringify(this.props.isLoading) !== JSON.stringify(nextProps.isLoading) || JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
                this.props.changeData(nextProps.grid, nextProps.data);

                this._rows = this.buildRows(nextProps);
            }

            if (nextProps.edit.row !== this._rowInEdit) {
                this._rowInEdit = nextProps.edit.row;
                this.props.changeData(nextProps.grid, nextProps.edit);
                this._rows = this.buildRows(nextProps);
            }
        }
    }, {
        key: 'createColumns',
        value: function createColumns(children) {
            var columns = [];
            var editColumnsTemp = {};
            var editColumns = [];

            _react2.default.Children.forEach(children, function (child) {
                if (_react2.default.isValidElement(child)) {
                    if (child.type === _Columns2.default) {
                        _react2.default.Children.forEach(child.props.children, function (col) {
                            if (_react2.default.isValidElement(col)) {
                                columns.push(col);
                            }
                        });
                    }

                    if (child.type === _EditColumns2.default) {
                        _react2.default.Children.forEach(child.props.children, function (col) {
                            if (_react2.default.isValidElement(col)) {
                                if (col.props.idx) {
                                    editColumnsTemp[col.props.idx] = col;
                                }
                            }
                        });
                    }
                }
            });

            for (var i in columns) {
                var idx = columns[i].props.idx || false;
                editColumns[i] = idx && editColumnsTemp.hasOwnProperty(idx) ? editColumnsTemp[idx] : columns[i];
            }

            this._columns = columns;
            this._editColumns = editColumns;
        }
    }, {
        key: 'buildRows',
        value: function buildRows(_ref) {
            var _this2 = this;

            var grid = _ref.grid,
                isLoading = _ref.isLoading,
                data = _ref.data,
                rest = _objectWithoutProperties(_ref, ['grid', 'isLoading', 'data']);

            return isLoading ? _react2.default.createElement(
                _FullRow2.default,
                { colSpan: this._columns.length },
                _react2.default.createElement(_reactLoading2.default, null)
            ) : data && data.length > 0 ? data.map(function (rowData, i) {
                if (_this2._rowInEdit === i) {
                    var EditRow = (0, _reduxForm.reduxForm)({
                        form: grid + '_form',
                        initialValues: rowData,
                        submitHandler: function submitHandler(data) {
                            return (0, _wikomData.submit)({ url: _this2.props.editRoute, data: data });
                        }
                    })(_Row2.default);

                    console.log(_this2.props.editRoute);

                    return _react2.default.createElement(
                        EditRow,
                        { rowData: rowData, key: i, rowId: i, grid: grid, url: _this2.props.editRoute },
                        _this2._editColumns
                    );
                } else {
                    return _react2.default.createElement(
                        _Row2.default,
                        { rowData: rowData, key: i, rowId: i, grid: grid,
                            editable: _this2.props.hasOwnProperty('editRoute') || false },
                        _this2._columns
                    );
                }
            }) : _react2.default.createElement(
                _FullRow2.default,
                { colSpan: this._columns.length },
                'Keine Ergebnisse vorhanden'
            );
        }
    }]);

    return EditableGrid;
}(_Grid3.default);

exports.default = EditableGrid;