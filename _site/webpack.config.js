const path = require('path');

module.exports = {
  mode: 'production',
  // devtool: 'inline-source-map',
  devServer: {
    contentBase: './_site',
  },
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'scripts'),
  },
  module: {
    rules: [
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader',
        ],
      },
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
};
