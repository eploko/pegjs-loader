var pegjs = require('pegjs');
var loaderUtils = require('loader-utils');

module.exports = function(source) {
  this.cacheable && this.cacheable();
  var query = loaderUtils.parseQuery(this.query);
  var pegOptions = { output: 'source' };
  var parser = 'module.exports = ' + pegjs.buildParser(source, pegOptions) + ';';
  this.callback(null, parser, null);
};
