const Path = require('path');
const Webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Remove module and use output.clean option in Webpack 5
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const BUILD_DIR = Path.resolve(__dirname, 'public/script');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    bundle: ['@babel/polyfill', './src/index.jsx'],
  },
  output: {
    path: BUILD_DIR,
    publicPath: '/berdi/script/',
    filename: '[name].js',
  },
  devtool: devMode ? 'cheap-module-eval-source-map' : 'none',
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
      },

      {
        test: /\.(png|jp(e*)g|svg)$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'url-loader',
          options: { limit: 8000 },
        }],
      },

      {
        test: /\.s?css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },

      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: { prefix: 'fonts/' },
        },
      },

      {
        test: /\.md$/,
        use: 'raw-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.json'],
    alias: {
      // TODO: Remove alias when int-compress-string is updated
      // Built package distribution causes a critical dependency warning
      // Might be from Parcel version 1 (https://github.com/parcel-bundler/parcel/issues/2883)
      'int-compress-string': Path.resolve(__dirname, 'node_modules/int-compress-string/src'),
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    devMode ? new Webpack.HotModuleReplacementPlugin() : null,
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    new CleanWebpackPlugin(),
  ].filter((v) => !!v),
};
