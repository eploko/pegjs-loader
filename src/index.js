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

  const options =
    this.query && this.query.startsWith && this.query.startsWith("?")
      ? loaderUtils.parseQuery(this.query)
      : loaderUtils.getOptions(this) || {};
  const cacheParserResults = !!options.cache;
  const optimizeParser = options.optimize || 'speed';
  const trace = !!options.trace;
  const dependencies = JSON.parse(options.dependencies || '{}');
  const allowedStartRules = extractAllowedStartRules(options);

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
