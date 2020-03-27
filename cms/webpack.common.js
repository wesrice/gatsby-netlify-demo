const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!(gatsby)\/)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [['react-app', { flow: false, typescript: true }]],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              'babel-plugin-remove-graphql-queries',
            ],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [['react-app', { flow: false, typescript: true }]],
          plugins: [
            require.resolve('@babel/plugin-proposal-class-properties'),
            require.resolve('babel-plugin-remove-graphql-queries'),
          ],
        },
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          path.resolve('../static-site-generator/node_modules/sass-loader'),
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          path.resolve('../static-site-generator/node_modules/sass-loader'),
        ]
      },
    ]
  },
  output: {
    filename: 'cms.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css' ,
      chunkFilename: '[id].css',
    }),
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.jsx', '.json', '.scss' ],
    // modules: [
    //   path.resolve(__dirname, 'src'),
    //   path.resolve(__dirname, 'node_modules'),
    //   path.resolve(__dirname, '../static-site-generator/node_modules'),
    //   'node_modules',
    // ],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
        logInfoToStdOut: true,
      }),
    ],
  },
};
