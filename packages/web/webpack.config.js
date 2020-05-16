const Dotenv = require('dotenv-webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || '5000';
const cwd = process.cwd();

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: 'src/index.html',
  inject: true,
});

module.exports = {
  context: cwd,
  devServer: {
    host: 'localhost',
    port: PORT,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
  },
  entry: ['./src/index.tsx'],
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(jpeg|jpg|png|gif|svg)$/i,
        loader: 'file-loader',
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
    path: path.join(cwd, '/build'),
  },
  mode: dev ? 'development' : 'production',
  plugins: [
    new Dotenv({ systemvars: true }),
    HTMLWebpackPluginConfig,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NormalModuleReplacementPlugin(
      /node_modules\/antd\/lib\/style\/index\.less/,
      path.resolve(cwd, 'src/antd-replacement.less'),
    ),
  ],

  node: {
    '*': 'empty',
  },
};
