var helpers = require('./helpers');
var webpack = require('webpack');
// require('es6-promise').polyfill()

module.exports = {
  output: {
    filename: '[name].js',
    path: helpers.appendToContextRoot('www'),
    chunkFilename: '[name]_[chunkhash].js'
  },
  externals: {
    'jquery': 'jQuery',
    'angular': 'angular'
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.ts', '.js', '.json'],
    alias: {
      'npm': helpers.appendToContextRoot('node_modules'),
      'jquery': helpers.appendToContextRoot('node_modules/jquery/dist/jquery.js'),
      'angular': helpers.appendToContextRoot('/node_modules/angular/angular.js')
    },
    modulesDirectories: [
      helpers.appendToContextRoot('node_modules'),
      helpers.appendToContextRoot('src'),
      helpers.appendToContextRoot('components'),
      helpers.appendToContextRoot('typings')
    ]
  },
  module: {
    noParse: [helpers.ctxRoot + '/node_modules/angular/angular.min.js'],
    preLoaders: [
      {test: /\.js$/, loader: 'eslint-loader', include: helpers.appendToContextRoot('src')},
      {test: /\.ts(x)$/, loader: 'tslint-loader', include: helpers.appendToContextRoot('src')},
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          /node_modules\/ng-metadata/,
          /node_modules\/rxjs/
          // helpers.root( 'node_modules/@angular2-material' )
        ]
      }
    ],
    loaders: [
      {test: /\.html$/, loader: 'raw-loader', exclude: [
        /node_modules/,
        helpers.appendToContextRoot('/src/index.html')
      ]},
      {test: /\.json$/, include: /\.json$/, loader: 'json-loader'}
    ]
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/\.DS_Store/),
  ],
  eslint: {
    configFile: '.eslintrc.yml',
    emitError: false,
    failOnError: false
  },
  tslint: {
    configuration: require('./../tslint.json'),
    emitErrors: true,
    failOnHint: false,
    resourcePath: helpers.appendToContextRoot('src')
  },

  bail: true
};
