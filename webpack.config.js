const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        main: "./src/main.ts",
        renderer: "./src/renderer.ts",
    },
    target: "electron-main",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        plugins: [new TsconfigPathsPlugin()],
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            chunks: [
                "renderer"
            ]
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './resources',
                    to: './resources'
                }
            ]
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js"
    }
}



