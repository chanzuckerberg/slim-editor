'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _draftJs = require('draft-js');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DocsDecorator = require('../editor_configuration/DocsDecorator');

var _DocsDecorator2 = _interopRequireDefault(_DocsDecorator);

var _SlimEditorBlockRenderer = require('../editor_configuration/SlimEditorBlockRenderer.js');

var _SlimEditorBlockRenderer2 = _interopRequireDefault(_SlimEditorBlockRenderer);

var _convertFromRaw = require('../utils/convertFromRaw');

var _convertFromRaw2 = _interopRequireDefault(_convertFromRaw);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getLocalEditorState(props) {
  var rawContentState = props.rawContentState;

  return (0, _convertFromRaw2.default)(rawContentState);
}

var DocsTableCell = function (_React$Component) {
  _inherits(DocsTableCell, _React$Component);

  function DocsTableCell() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DocsTableCell);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DocsTableCell.__proto__ || Object.getPrototypeOf(DocsTableCell)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      localEditorState: _draftJs.EditorState.set(getLocalEditorState(_this.props), {
        decorator: _DocsDecorator2.default.get()
      })
    }, _this._renderBlock = function (contentBlock) {
      var blockProps = {
        editorState: _this.state.localEditorState,
        editorWidth: _this.props.colWidth
      };
      return _SlimEditorBlockRenderer2.default.renderBlock(contentBlock, blockProps);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DocsTableCell, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          cellIndex = _props.cellIndex,
          colsCount = _props.colsCount,
          colWidth = _props.colWidth,
          leftColHighlight = _props.leftColHighlight,
          rowIndex = _props.rowIndex,
          topRowHighlight = _props.topRowHighlight;

      var isTopRow = rowIndex === 0;
      var isLeftColumn = cellIndex === 0;
      var isLastColumn = cellIndex === colsCount - 1;
      var shouldHighlightCell = isTopRow && topRowHighlight || isLeftColumn && leftColHighlight;
      var styleProp = shouldHighlightCell ? { backgroundColor: '#efefef' } : {};
      var editor = _react2.default.createElement(_draftJs.Editor, { blockRendererFn: this._renderBlock, editorState: this.state.localEditorState });

      if (isTopRow) {
        return _react2.default.createElement(
          'th',
          { 'data-colwidth': isLastColumn ? null : colWidth, style: styleProp },
          editor
        );
      }
      return _react2.default.createElement(
        'td',
        { 'data-colwidth': isLastColumn ? null : colWidth, style: styleProp },
        editor
      );
    }
  }]);

  return DocsTableCell;
}(_react2.default.Component);

exports.default = DocsTableCell;