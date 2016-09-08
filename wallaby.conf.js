// var babel = require('babel-core');
var wallabyWebpack = require('wallaby-webpack');
var webpackTestConfig = require('./config/webpack.test.js');
var path = require('path');

module.exports = function(wallaby) {
  delete webpackTestConfig.devtool;
  delete webpackTestConfig.output;
  // removing instrumenters
  delete webpackTestConfig.module.preLoaders;
  delete webpackTestConfig.module.postLoaders;

  // remove ts-loader
  var tsLoaderIndex = webpackTestConfig.module.loaders.findIndex(function(element) {
    return element.loader === 'ts-loader';
  });

  webpackTestConfig.module.loaders.splice(tsLoaderIndex, 1);
  webpackTestConfig.context = path.join(wallaby.projectCacheDir, 'src');

  // Wallaby compiles .ts to .js, so don't need to load .ts files
  webpackTestConfig.resolve.extensions = ['', '.js', '.json'];
  // Pointing webpack to wallaby cache instead of local project folder,
  // expect external modules (we don't want to copy them to wallaby cache)
  // https://wallabyjs.com/docs/integration/webpack.html#absolute-paths-for-wallaby-cache-folder
  webpackTestConfig.resolve.modulesDirectories = webpackTestConfig.resolve.modulesDirectories.map(function(element) {
    return ~element.indexOf('node_modules') || ~element.indexOf('bower_components')
      ? element
      : element.replace(path.resolve(wallaby.localProjectDir), wallaby.projectCacheDir);
  });

  webpackTestConfig.entryPatterns = [
    'test/spec-bundle-wallaby.js',
    'src/**/*.spec.js'
  ]

  return {
    files: [
      {pattern: 'node_modules/jquery/dist/jquery.min.js', instrument: false},
      {pattern: 'node_modules/angular/angular.min.js', instrument: false},
      {pattern: 'node_modules/angular-mocks/angular-mocks.js', instrument: false},
      {pattern: 'node_modules/chai/chai.js', instrument: false},
      {pattern: 'node_modules/chai-as-promised/lib/chai-as-promised.js', instrument: false},
      {pattern: 'node_modules/chai-jquery/chai-jquery.js', instrument: false},
      {pattern: 'node_modules/sinon/pkg/sinon-1.17.5.js', instrument: false},
      {pattern: 'node_modules/sinon-chai/lib/sinon-chai.js', instrument: false},
      {pattern: 'src/**/*.*s', load: false},
      {pattern: 'src/**/*.spec.ts', ignore: true},
      {pattern: 'src/**/*.spec.js', ignore: true},
      {pattern: 'test/spec-bundle-wallaby.ts', instrument: false, load: false}
    ],
    tests: [
      {pattern: 'src/**/*.spec.js', load: false},
      {pattern: 'src/**/*.spec.ts', load: false}
    ],
    // Karma is using this PhantomJs version, so let's do it as well
    env: {
      runner: require('phantomjs-prebuilt').path,
      params: { runner: '--web-security=false' }
    },

    testFramework: 'mocha',

    debug: true,

    postprocessor: wallabyWebpack(webpackTestConfig),
    bootstrap: function() {
      window.chai = chai; 
      window.expect = chai.expect;
      window.assert = chai.assert;
      window.should = undefined;
      window.should = chai.should();
      window.__moduleBundler.loadTests();
    }
  };
};
