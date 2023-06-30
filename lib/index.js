'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = loader;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _pegjs = require('pegjs');

var _pegjs2 = _interopRequireDefault(_pegjs);

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

function extractAllowedStartRules(query) {
  if (typeof query.allowedStartRules === 'string') {
    return [query.allowedStartRules];
  }
  if (Array.isArray(query.allowedStartRules)) {
    return query.allowedStartRules;
  }
  return [];
}

function loader(source) {
  if (this.cacheable) {
    this.cacheable();
  }

  var query = this.query ? _loaderUtils2['default'].parseQuery(this.query) : {};
  var cacheParserResults = !!query.cache;
  var optimizeParser = query.optimize || 'speed';
  var trace = !!query.trace;
  var dependencies = JSON.parse(query.dependencies || '{}');
  var allowedStartRules = extractAllowedStartRules(query);

  // Description of PEG.js options: https://github.com/pegjs/pegjs#javascript-api
  var pegOptions = {
    cache: cacheParserResults,
    dependencies: dependencies,
    format: 'commonjs',
    optimize: optimizeParser,
    output: 'source',
    trace: trace
  };
  if (allowedStartRules.length > 0) {
    pegOptions.allowedStartRules = allowedStartRules;
  }

  var methodName = typeof _pegjs2['default'].generate === 'function' ? 'generate' : 'buildParser';
  return _pegjs2['default'][methodName](source, pegOptions);
}

module.exports = exports['default'];