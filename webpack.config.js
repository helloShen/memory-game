const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/index.jsx',
  devtool: 'inline-source-map',
  // plugins: [
  //     new HtmlWebpackPlugin({
  //         title: 'Todo'
  //     })
  // ],
  module: {
    rules: [
      {
        test: /\.css|less|sass$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(m?js|jsx)$/,
        // allow import foo from 'foo' instead of 'foo.js'
        resolve: {
          fullySpecified: false,
        },
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  output: {
    filename: 'js/bundle.js',
    assetModuleFilename: 'assets/[hash][ext]',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    enforceExtension: false,
    extensions: ['.js', '.jsx', '...'],
  },
};
