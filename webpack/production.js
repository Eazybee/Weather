const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.WEATHER_API_KEY': JSON.stringify(process.env.WEATHER_API_KEY)
    })
  ],
  performance: {
    hints: false,
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        cache: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
};
