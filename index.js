var pegjs = require('pegjs');
var loaderUtils = require('loader-utils');

module.exports = function(source) {
  this.cacheable && this.cacheable();
  var query = loaderUtils.parseQuery(this.query);
  var cacheParserResults = !!query.cache;
  // Description of PEG.js options: https://github.com/pegjs/pegjs#javascript-api
  var pegOptions = { output: 'source', cache: cacheParserResults };
  return 'module.exports = ' + pegjs.buildParser(source, pegOptions) + ';';
};
