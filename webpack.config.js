var path = require('path');


module.exports = {
    entry: path.resolve(__dirname, './js/main.js'),
    resolve: {
        root: path.resolve('./'),
        extensions: ['', '.js', '.less']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-object-rest-spread']
                }
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            {
                test: /\.(eot|ttf|woff|svg)(\?[a-z0-9]+)?$/,
                loader: 'file?name=[name].[ext]?[hash:6]'
            }
        ]
    }
};
