const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            chunks: [
                "renderer"
            ]
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js"
    }
}



