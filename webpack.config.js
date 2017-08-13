const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    context: path.resolve(__dirname, './src'),

    entry: {
        app: './app.ts',
        vendor: './vendor.ts',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },

    resolve: {
        extensions: ['.ts', '.js'],
    },

    devtool: 'cheap-module-source-map',

    devServer: {
        stats: 'minimal',
        port: 4000,
        historyApiFallback: true,
        compress: true,
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                use: 'tslint-loader',
            },
            {
                test: /\.ts$/,
                use: ['awesome-typescript-loader', 'angular2-template-loader'],
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './app.html',
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor'],
        }),

        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname, './'),
        ),

        new WebpackNotifierPlugin(),
    ],
};
