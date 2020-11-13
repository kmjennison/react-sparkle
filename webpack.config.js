const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  // Setting mode to 'development' breaks the build with a
  // "require not defined" error. Unsure why.
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname),
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  externals: {
    // Use the parent project's React dependency
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React', // will be window.React
    },
  },
}
