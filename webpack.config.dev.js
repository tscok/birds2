const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const baseConfig = require('./webpack.config.js');


module.exports = function() {
    return webpackMerge(baseConfig(), {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('development')
                }
            }),
            new webpack.HotModuleReplacementPlugin()
        ],
        devServer: {
            // compress: true,
            historyApiFallback: true,
            host: '0.0.0.0',
            hot: true,
            inline: true,
            publicPath: '/bin/'
        },
        devtool: 'cheap-module-eval-source-map'
    });
}
