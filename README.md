# [PEG.js](https://github.com/pegjs/pegjs) loader for [webpack](http://webpack.github.io/)

[![build status](https://img.shields.io/travis/eploko/pegjs-loader/master.svg?style=flat-square)](https://travis-ci.org/eploko/pegjs-loader)
[![npm version](https://img.shields.io/npm/v/pegjs-loader.svg?style=flat-square)](https://www.npmjs.com/package/pegjs-loader)
[![npm downloads](https://img.shields.io/npm/dm/pegjs-loader.svg?style=flat-square)](https://www.npmjs.com/package/pegjs-loader)

## Install

`npm install --save-dev pegjs-loader pegjs webpack`

The pegjs-loader requires [PEG.js](https://github.com/pegjs/pegjs) and [webpack](https://github.com/webpack/webpack)
as [`peerDependency`](https://docs.npmjs.com/files/package.json#peerdependencies). Thus you are able to specify the required versions accurately.

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` js
var parser = require("!pegjs!./parser.pegjs");
// => returns compiled PEG.js parser
```

### Apply via webpack config

It's recommended to adjust your `webpack.config` so `pegjs!` is applied automatically on all files ending on `.pegjs`:

``` js
module.exports = {
  ...
  module: {
    loaders: [
      {
        test: /\.pegjs$/,
        loader: 'pegjs-loader'
      }
    ]
  }
};
```

Then you only need to write: `require("./parser.pegjs")`.

### PEG.js options

You can pass options to PEG.js as [query parameters](http://webpack.github.io/docs/using-loaders.html#query-parameters). The following options are supported:

  * `cache` — if `true`, makes the parser cache results, avoiding exponential
    parsing time in pathological cases but making the parser slower (default:
    `false`)
    
``` js
module.exports = {
  ...
  module: {
    loaders: [
      {
        test: /\.pegjs$/,
        loader: 'pegjs-loader?cache=true'
      }
    ]
  }
};
```

## Change Log

This project adheres to [Semantic Versioning](http://semver.org/).  
Every release, along with the migration instructions, if any, is documented on the Github [Releases](https://github.com/eploko/pegjs-loader/releases) page.

## Thanks

[Victor Homyakov](https://github.com/victor-homyakov) for the propagation of the cache option.

## License

MIT (http://www.opensource.org/licenses/mit-license.php)