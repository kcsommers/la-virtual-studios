const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'developmnet',
  entry: './src/server.ts',
  devtool: 'inline-source-map',
  target: 'node',
  externals: [nodeExternals()],
  externalsPresets: {
    node: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: path.resolve(__dirname, './public'), to: 'public' }],
    }),
  ],
};
