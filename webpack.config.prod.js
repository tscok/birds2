const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const baseConfig = require('./webpack.config.js');


module.exports = function() {
    return webpackMerge(baseConfig(), {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ]
    });
}
