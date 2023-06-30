import pegjs from 'pegjs';
import loaderUtils from 'loader-utils';

function extractAllowedStartRules(query) {
  if (typeof query.allowedStartRules === 'string') {
    return [query.allowedStartRules];
  }
  if (Array.isArray(query.allowedStartRules)) {
    return query.allowedStartRules;
  }
  return [];
}

export default function loader(source) {
  if (this.cacheable) {
    this.cacheable();
  }

  const query = this.query ? loaderUtils.parseQuery(this.query) : {};
  const cacheParserResults = !!query.cache;
  const optimizeParser = query.optimize || 'speed';
  const trace = !!query.trace;
  const dependencies = JSON.parse(query.dependencies || '{}');
  const allowedStartRules = extractAllowedStartRules(query);

  // Description of PEG.js options: https://github.com/pegjs/pegjs#javascript-api
  const pegOptions = {
    cache: cacheParserResults,
    dependencies,
    format: 'commonjs',
    optimize: optimizeParser,
    output: 'source',
    trace,
  };
  if (allowedStartRules.length > 0) {
    pegOptions.allowedStartRules = allowedStartRules;
  }

  const methodName = (typeof pegjs.generate === 'function') ? 'generate' : 'buildParser';
  return pegjs[methodName](source, pegOptions);
}
