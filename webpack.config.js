const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './assets/js/index.js',
  output: {
    path: path.resolve(__dirname, 'assets/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader"
      ]
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: ["file-loader"]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
};
