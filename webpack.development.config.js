var path = require('path');
var webpack = require('webpack');
var buildPath = path.resolve(__dirname, 'build/public/');
var mainPath = path.resolve(__dirname, 'dev/index');

var config = {
  devtool: 'inline-source-map',
  entry: {
    a:'webpack-dev-server/client?http://localhost:1337',
    b:'webpack/hot/only-dev-server',
		app: mainPath,
		vendors: ['react','react-router'] // And other vendors
	},
  output: {
    path: buildPath,
    filename: '[name].js', // Notice we use a variable
		publicPath: '/public/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
			'process.env': {
				// This has effect on the react lib size
				'NODE_ENV': JSON.stringify('production'),
			},
		}),
		new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'], exclude: /node_modules/
  },
  module: {
    loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['react-hot', 'babel'],
				include: path.join(__dirname, 'dev')
    	},
			{
        test: /\.json$/,
        loader: 'json-loader'
      }
		]
  }
};
module.exports = config;