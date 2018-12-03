'use strict';

var _draftJs = require('draft-js');

var _findEntitiesForType = require('../utils/findEntitiesForType.js');

var _findEntitiesForType2 = _interopRequireDefault(_findEntitiesForType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var entries = [];

module.exports = {
  // https://draftjs.org/docs/advanced-topics-decorators.html#compositedecorator
  register: function register(decoratorType, Component) {
    var strategy = _findEntitiesForType2.default.bind(null, decoratorType);
    entries.push({
      strategy: strategy,
      component: Component
    });
  },
  get: function get() {
    return new _draftJs.CompositeDecorator(entries);
  }
};