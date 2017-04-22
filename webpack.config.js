/**
 * Created by rouven on 11.04.17.
 */

const path = require('path');

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
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loaders: ["style", "css"]
            }
        ]
    },
    debug: true,
    devtool: 'source-map',
    externals: {
        "find-in-object": "find-in-object",
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
