const path = require('path');
const webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = function() {
    return {
        entry: './src/index.js',
        output: {
            filename: 'site.min.js',
            path: path.resolve(__dirname, 'bin')
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: { minimize: true }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: function() {
                                        return [
                                            require('autoprefixer')
                                        ];
                                    }
                                }
                            },
                            'less-loader'
                        ]
                    })
                },
                {
                    test: /\.(eot|ttf|woff|svg)(\?[a-z0-9]+)?$/,
                    use: 'file-loader?name=[name].[ext]?[hash:6]'
                }
            ]
        },
        resolve: {
            modules: [
                path.resolve(__dirname, '/'),
                path.resolve(__dirname, 'src'),
                'node_modules'
            ]
        },
        plugins: [
            new ExtractTextPlugin('site.min.css')
        ]
    };
}
