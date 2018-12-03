'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _draftJs = require('draft-js');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _docsTableCell = require('./docsTableCell.js');

var _docsTableCell2 = _interopRequireDefault(_docsTableCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getEntityDataID(rowIndex, cellIndex) {
  return 'cell_' + rowIndex + '_' + cellIndex;
}

var DocsTableRow = function (_React$Component) {
  _inherits(DocsTableRow, _React$Component);

  function DocsTableRow() {
    _classCallCheck(this, DocsTableRow);

    return _possibleConstructorReturn(this, (DocsTableRow.__proto__ || Object.getPrototypeOf(DocsTableRow)).apply(this, arguments));
  }

  _createClass(DocsTableRow, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          colWidths = _props.colWidths,
          entity = _props.entity,
          leftColHighlight = _props.leftColHighlight,
          rowIndex = _props.rowIndex,
          topRowHighlight = _props.topRowHighlight;


      var entityData = entity.getData();
      var colsCount = entityData.colsCount,
          rowHeights = entityData.rowHeights;

      var cellsCount = colsCount;

      var tableCells = [];

      var rr = rowIndex;
      var cc = 0;
      while (cc < cellsCount) {
        var id = getEntityDataID(rr, cc);
        var rawContentState = entityData[id];

        tableCells.push(_react2.default.createElement(_docsTableCell2.default, {
          cellIndex: cc,
          colsCount: colsCount,
          colWidth: colWidths && colWidths[cc],
          key: id,
          leftColHighlight: leftColHighlight,
          rawContentState: rawContentState,
          rowIndex: rr,
          topRowHighlight: topRowHighlight
        }));
        cc++;
      }
      return _react2.default.createElement(
        'tr',
        null,
        tableCells
      );
    }
  }]);

  return DocsTableRow;
}(_react2.default.Component);

exports.default = DocsTableRow;