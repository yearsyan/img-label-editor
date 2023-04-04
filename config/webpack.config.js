const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const babelLoaderConfig = {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env', '@babel/preset-react']
  }
}

module.exports = {
  entry: {
    index: path.join(__dirname, "../web/index.tsx"),
  },
  output: {
    filename: "[name].[chunkhash:8].js",
    path: path.join(__dirname, "../dist/web"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [babelLoaderConfig]
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [babelLoaderConfig, 'ts-loader']
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
        include: [
          path.resolve(__dirname, '../web'),
          path.resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ],
        include: [
          path.resolve(__dirname, '../web'),
          path.resolve(__dirname, '../node_modules')
        ]
      }
    ],
  },
  devServer: {
    port: 8084,
    hot: true,
    open: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../web'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public/index.html"),
      filename: "index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../public'),
          to: path.join(__dirname, '../dist/web'),
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
  ]
}