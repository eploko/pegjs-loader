import pegjs from 'pegjs';
import loaderUtils from 'loader-utils';

export default function loader(source) {
  if (this.cacheable) {
    this.cacheable();
  }

  const query = loaderUtils.parseQuery(this.query);
  const cacheParserResults = !!query.cache;
  const optimizeParser = query.optimize || 'speed';

  // Description of PEG.js options: https://github.com/pegjs/pegjs#javascript-api
  const pegOptions = {
    output: 'source',
    cache: cacheParserResults,
    optimize: optimizeParser,
  };

  return `module.exports = ${pegjs.buildParser(source, pegOptions)};`;
}
