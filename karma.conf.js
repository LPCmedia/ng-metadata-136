'use strict';
var webpackCfg = require('./config/webpack.test.js');
module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['source-map-support', 'mocha', 'chai-as-promised', 'chai-sinon', 'jquery-chai'],
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/angular/angular.min.js',
      'node_modules/angular-aria/angular-aria.min.js',
      'node_modules/angular-animate/angular-animate.min.js',
      'node_modules/angular-cookies/angular-cookies.min.js',
      'node_modules/angular-messages/angular-messages.min.js',
      'node_modules/angular-sanitize/angular-sanitize.min.js',
      'test/spec-bundle.js'
    ],
    plugins: [
      require('karma-source-map-support'),
      require('karma-mocha'),
      require('karma-mocha-reporter'),
      require('karma-coverage'),
      require('karma-webpack'),
      require('karma-phantomjs-launcher'),
      require('karma-sourcemap-loader'),
      require('karma-chai'),
      require('karma-jquery-chai'),
      require('karma-chai-sinon'),
      require('karma-chai-as-promised'),
      require('karma-junit-reporter')
    ],
    exclude: [
      'node_modules', 'bower_components'
    ],
    preprocessors: {
      './test/spec-bundle.js': ['coverage', 'webpack', 'sourcemap']
    },
    webpack: webpackCfg,
    webpackMiddleware: {
      noInfo: false
    },
    reporters: ['mocha', 'coverage', 'junit'],
    mochaReporter: {
      output: 'full'
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        {type: 'json', subdir: '.'},
      ],
    },
    junitReporter: {
      outputDir: './coverage',
      useBrowserName: false,
      outputFile: 'test-results.xml'
    },
    reportSlowerThan: 12,
    autoWatch: true,
    browsers: ['PhantomJS'],
    browserNoActivityTimeout: 30000
  });
};
