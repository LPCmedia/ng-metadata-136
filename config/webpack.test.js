var webpack = require('webpack');
var webpackMerge = require('webpack-merge'); // used to merge webpack configs
var commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev
var helpers = require('./helpers');
var srcCtx = helpers.appendToContextRoot('src');
var path = require('path');
module.exports = webpackMerge(commonConfig, {
  context: srcCtx,
  root: srcCtx,
  debug: true,
  devtool: 'inline-source-map',
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ja/),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.NormalModuleReplacementPlugin(/\.(ttf|gif|png|scss|css|sass|styl|svg|json)$/, 'node-noop'),
    new webpack.NormalModuleReplacementPlugin(/sinon/, helpers.appendToContextRoot('node_modules/sinon/pkg/sinon-1.17.5.js'))

  ],
  module: {
    noParse: [
      /sinon/
    ],
    loaders: [
      { test: /\.tsx?$/, exclude: /(node_modules\/)/, loader: 'ts-loader'},
      { test: /\.html$/, loader: 'raw-loader', exclude: [
        /node_modules/,
      ]}
    ],
    postLoaders: [
      {
        test: /\.(js|ts)$/, loader: 'istanbul-instrumenter-loader',
        include: path.resolve('src'),
        exclude: [
          /\.(e2e|spec)\.(ts|js)$/,
          /node_modules/,
          /bower_components/,
          /(polyfills|vendor|index)\.ts/
        ]
      }
    ]
  },
  node: {
    fs: 'empty',
    crypto: 'empty'
  },
  tslint: {
    configuration: require('./../tslint.json'),
    emitErrors: false,
    failOnHint: false,
    resourcePath: srcCtx
  },
  bail: true
});
