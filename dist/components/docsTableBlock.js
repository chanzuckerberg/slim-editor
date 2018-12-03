'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _docsTableRow = require('./docsTableRow.js');

var _docsTableRow2 = _interopRequireDefault(_docsTableRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DocsTable = function (_React$Component) {
  _inherits(DocsTable, _React$Component);

  function DocsTable(props) {
    _classCallCheck(this, DocsTable);

    var _this = _possibleConstructorReturn(this, (DocsTable.__proto__ || Object.getPrototypeOf(DocsTable)).call(this, props));

    _this.state = { containerWidth: _this.props.blockProps.editorWidth };
    return _this;
  }

  _createClass(DocsTable, [{
    key: 'render',
    value: function render() {
      var blockProps = this.props.blockProps;
      var containerWidth = this.state.containerWidth;
      var entity = blockProps.entity,
          editorState = blockProps.editorState,
          entityKey = blockProps.entityKey;

      var entityData = entity.getData();
      var colsCount = entityData.colsCount,
          rowsCount = entityData.rowsCount,
          colWidths = entityData.colWidths,
          leftColBgStyle = entityData.leftColBgStyle,
          topRowBgStyle = entityData.topRowBgStyle;

      var colWidthsInPx = colWidths && colWidths.map(function (width) {
        return Math.round(width * containerWidth);
      });
      var tableRows = [];
      var rowIndex = 0;

      while (rowIndex < rowsCount) {
        tableRows.push(_react2.default.createElement(_docsTableRow2.default, {
          colWidths: colWidthsInPx,
          editorState: editorState,
          entity: entity,
          entityKey: entityKey,
          key: 'row_' + rowIndex,
          leftColHighlight: typeof leftColBgStyle === 'string',
          rowIndex: rowIndex,
          topRowHighlight: typeof topRowBgStyle === 'string'
        }));
        rowIndex++;
      }
      return _react2.default.createElement(
        'table',
        null,
        _react2.default.createElement(
          'tbody',
          null,
          tableRows
        )
      );
    }
  }]);

  return DocsTable;
}(_react2.default.Component);

exports.default = DocsTable;