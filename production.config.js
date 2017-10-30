/**
 * Created by rouven on 11.04.17.
 */

const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: 'wikomGrid',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [
                    /node_modules/,
                    "**/__tests__/*"
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loaders: ["style", "css"]
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                drop_console: true
            },
            output: {
                comments: false
            }
        })
    ],
    externals: {
        "find-in-object": "find-in-object",
        "moment": "moment",
        "prop-types": "prop-types",
        "query-string": "query-string",
        "react": "react",
        "react-conditional": "react-conditional",
        "react-dom": "react-dom",
        "react-loading": "react-loading",
        "react-pager": "react-pager",
        "react-symbol": "react-symbol",
        "react-redux": "react-redux",
        "react-router-dom": "react-router-dom",
        "react-router-redux": "react-router-redux",
        "react-datetime": "react-datetime",
        "redux": "redux",
        "redux-form": "redux-form",
        "wikom-data": "wikom-data",
        "wikom-form": "wikom-form",
        "with-tooltip": "with-tooltip"
    }
};
