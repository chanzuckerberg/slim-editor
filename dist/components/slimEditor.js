'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _draftJs = require('draft-js');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SlimEditorBlockRenderer = require('../editor_configuration/SlimEditorBlockRenderer.js');

var _SlimEditorBlockRenderer2 = _interopRequireDefault(_SlimEditorBlockRenderer);

var _DocsConfig = require('../editor_configuration/DocsConfig.js');

var _DocsConfig2 = _interopRequireDefault(_DocsConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_EDITOR_WIDTH = 696;

_DocsConfig2.default.init();

var SlimEditor = function (_React$PureComponent) {
  _inherits(SlimEditor, _React$PureComponent);

  function SlimEditor() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SlimEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SlimEditor.__proto__ || Object.getPrototypeOf(SlimEditor)).call.apply(_ref, [this].concat(args))), _this), _this._renderBlock = function (contentBlock) {
      var editorState = _this.props.editorState;

      var blockProps = {
        editorState: editorState,
        editorWidth: DEFAULT_EDITOR_WIDTH
      };
      return _SlimEditorBlockRenderer2.default.renderBlock(contentBlock, blockProps);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SlimEditor, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_draftJs.Editor, { blockRendererFn: this._renderBlock, editorState: this.props.editorState });
    }
  }]);

  return SlimEditor;
}(_react2.default.PureComponent);

exports.default = SlimEditor;