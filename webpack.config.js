const path = require('path');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './assets/js/index.js',
  output: {
    path: path.resolve(__dirname, 'assets/dist'),
    filename: 'bundle.js'
  },
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader?-minimize",
        "sass-loader"
      ]
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: "file-loader"
    }, {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      'jQuery': 'jquery',
      'lunr': 'lunr'
    }),
    new BrowserSyncPlugin({
      proxy: 'localhost:2368',
      open: false
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        extractComments: 'all'
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: ['default', { discardComments: { removeAll: true }}]
      })
    ]
  }
};
