const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const srcDir = path.resolve(__dirname, 'src');
const distDir = path.resolve(__dirname, 'dist');
const publicDir = path.resolve(__dirname, 'public');

module.exports = {
  mode: 'development',
  // 엔트리 포인트
  entry: `${srcDir}/index.tsx`,
  output: {
    // 빌드 결과물을 dist/main.js에 위치
    path: distDir,
    publicPath: '/',
    filename: 'js/main.[hash].js',
  },
  // 디버깅을 위해 빌드 결과물에 소스맵 추가
  devtool: 'source-map',
  resolve: {
    // 파일 확장자 처리
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      // .ts나 .tsx 확장자를 ts-loader가 트랜스파일
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]?[hash]',
            publicPath: './dist/',
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Dear World',
      template: `${publicDir}/index.html`,
      filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: publicDir,
          to: distDir,
        },
      ],
    }),
  ],
  devServer: {
    contentBase: distDir,
    hot: true,
    historyApiFallback: true,
  },
};
