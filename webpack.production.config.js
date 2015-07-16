var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'distribution/public');
var mainPath = path.resolve(__dirname, 'dev');
var config = {
  entry: {
		app: mainPath,
		vendors: ['react','react-router']
	},
  output: {
    path: buildPath,
    filename: '[name].js',
  },
	resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,

        // There is not need to run the loader through
        // vendors
        exclude: [node_modules_dir],
        loader: 'babel'
      },    
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
	plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
};

module.exports = config;