const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production' ) {
  process.env.PORT = 3001;
  require('netlify-cms-proxy-server');

  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('./webpack.dev.js');
  const compiler = webpack(config);

  app.use('/uploads', express.static(path.join(__dirname, '..', 'content', 'uploads')));

  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }));
}

app.use(express.static('./build'));

app.listen(PORT, '0.0.0.0', function () {
  console.log(`Netlify CMS listening on port ${PORT}\n`);
});
