const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackDevConfig = require('./webpack.config.js');

const compiler = webpack(webpackDevConfig);
const server = new WebpackDevServer(compiler, webpackDevConfig.devServer);

const PORT = process.env.PORT || 3000;

server.listen(PORT, 'localhost', (err) => {
    if (err) {
        console.log('\n\n[webpack-dev-server err]', err, '\n\n');
    }
});

compiler.plugin('done', (stats) => {
    
});

compiler.plugin('failed', (err) => {
    console.log('\n\n[webpack build err]', err, '\n\n');
});

compiler.plugin('compilation', compilation => {});