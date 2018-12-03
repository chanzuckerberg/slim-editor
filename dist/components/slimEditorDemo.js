'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DocsConfig = require('../editor_configuration/DocsConfig.js');

var _DocsConfig2 = _interopRequireDefault(_DocsConfig);

var _DocsDecorator = require('../editor_configuration/DocsDecorator');

var _DocsDecorator2 = _interopRequireDefault(_DocsDecorator);

var _slimEditor = require('./slimEditor.js');

var _slimEditor2 = _interopRequireDefault(_slimEditor);

var _uniqueID = require('../utils/uniqueID');

var _uniqueID2 = _interopRequireDefault(_uniqueID);

var _convertDraftEditorStateToHTML = require('../utils/convertDraftEditorStateToHTML');

var _convertDraftEditorStateToHTML2 = _interopRequireDefault(_convertDraftEditorStateToHTML);

var _convertFromRaw = require('../utils/convertFromRaw');

var _convertFromRaw2 = _interopRequireDefault(_convertFromRaw);

var _convertToRaw = require('../utils/convertToRaw');

var _convertToRaw2 = _interopRequireDefault(_convertToRaw);

var _noop = require('../utils/noop');

var _noop2 = _interopRequireDefault(_noop);

require('../styles/slimEditorPage.css');

var _reactBootstrap = require('react-bootstrap');

var _draftJs = require('draft-js');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LOCAL_STORAGE_KEY = 'slim-editor-examples';

_DocsConfig2.default.init();

function getInitialState() {
  var editorState = _draftJs.EditorState.createEmpty(_DocsDecorator2.default.get());
  var debugValue = '';
  try {
    debugValue = window.localStorage.getItem(LOCAL_STORAGE_KEY) || '';
    if (/^\{/.test(debugValue)) {
      var raw = JSON.parse(debugValue);
      editorState = (0, _convertFromRaw2.default)(raw);
    }
  } catch (ex) {
    editorState = {};
  }
  return {
    debugKey: (0, _uniqueID2.default)(),
    editorState: editorState,
    initialEditorState: editorState,
    debugValue: debugValue,
    debugMode: /debug_mode=1/.test(document.cookie)
  };
}

var SlimEditorDemo = function (_React$Component) {
  _inherits(SlimEditorDemo, _React$Component);

  function SlimEditorDemo(props) {
    _classCallCheck(this, SlimEditorDemo);

    var _this = _possibleConstructorReturn(this, (SlimEditorDemo.__proto__ || Object.getPrototypeOf(SlimEditorDemo)).call(this, props));

    _this._dropping = false;

    _this.applyJSON = function (raw) {
      var _this$state = _this.state,
          editorState = _this$state.editorState,
          debugMode = _this$state.debugMode;

      _this.setState({
        debugValue: debugMode ? JSON.stringify(raw, null, 2) : '',
        editorState: (0, _convertFromRaw2.default)(raw, editorState)
      });
    };

    _this._importJSON = function () {
      var debugKey = _this.state.debugKey;

      var el = document.getElementById(debugKey);
      if (el) {
        try {
          var json = el.value.trim();
          var raw = JSON.parse(json);
          _this.applyJSON(raw);
        } catch (ex) {
          el.value = ex.message;
        }
      }
    };

    _this._reset = function () {
      var initialEditorState = _this.state.initialEditorState;

      _this.setState({
        editorState: initialEditorState
      });
    };

    _this._dump = function (callback) {
      var editorState = _this.state.editorState;

      var raw = (0, _convertToRaw2.default)(editorState);
      var debugValue = JSON.stringify(raw, null, 2);
      var fn = typeof callback === 'function' ? callback : _noop2.default;
      _this.setState({
        debugValue: debugValue,
        debugKey: (0, _uniqueID2.default)()
      }, fn);
    };

    _this._save = function () {
      var debugKey = _this.state.debugKey;

      var el = document.getElementById(debugKey);
      if (el) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, el.value);
      }
    };

    _this._clear = function () {
      var debugKey = _this.state.debugKey;

      var el = document.getElementById(debugKey);
      if (el) {
        el.value = '';
      }
      _this.setState({ debugValue: '', debugKey: (0, _uniqueID2.default)() });
      window.localStorage.clear();
    };

    _this._toggleDebugMode = function () {
      var debugMode = !_this.state.debugMode;
      _this.setState({
        debugMode: debugMode
      });
      document.cookie = 'debug_mode=' + (debugMode ? 1 : '');
    };

    _this.state = getInitialState();
    return _this;
  }

  _createClass(SlimEditorDemo, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          debugMode = _state.debugMode,
          debugValue = _state.debugValue,
          debugKey = _state.debugKey,
          editorState = _state.editorState;


      return _react2.default.createElement(
        'div',
        { className: 'react-root' },
        _react2.default.createElement(
          'div',
          { className: 'grid-container' },
          _react2.default.createElement(
            'div',
            { className: 'slim-editor' },
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'strong',
                null,
                'Slim Editor HTML'
              )
            ),
            _react2.default.createElement('textarea', { value: (0, _convertDraftEditorStateToHTML2.default)(editorState) })
          ),
          _react2.default.createElement(
            'div',
            { className: 'debug-tool' },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                _reactBootstrap.ButtonGroup,
                null,
                _react2.default.createElement(
                  _reactBootstrap.Button,
                  { onClick: this._save, bsStyle: 'primary' },
                  'Save'
                )
              ),
              _react2.default.createElement(
                _reactBootstrap.ButtonGroup,
                null,
                _react2.default.createElement(
                  _reactBootstrap.Button,
                  { onClick: this._dump },
                  'Dump'
                ),
                _react2.default.createElement(
                  _reactBootstrap.Button,
                  { onClick: this._clear },
                  'Clear'
                )
              ),
              _react2.default.createElement(
                _reactBootstrap.ButtonGroup,
                null,
                _react2.default.createElement(
                  _reactBootstrap.Button,
                  { onClick: this._importJSON },
                  'Import JSON'
                ),
                _react2.default.createElement(
                  _reactBootstrap.Button,
                  { onClick: this._reset },
                  'Reset'
                )
              ),
              _react2.default.createElement(
                'label',
                { className: 'checkbox' },
                _react2.default.createElement('input', { type: 'checkbox', checked: debugMode, onChange: this._toggleDebugMode }),
                'debug mode'
              )
            ),
            _react2.default.createElement('textarea', {
              className: 'debug-text-area',
              defaultValue: debugValue,
              id: debugKey,
              key: debugKey
            })
          )
        )
      );
    }
  }]);

  return SlimEditorDemo;
}(_react2.default.Component);

exports.default = SlimEditorDemo;