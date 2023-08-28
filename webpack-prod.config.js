const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (env) => {
    return {
        mode: 'development',
        entry: {
            main: './src/main.ts',
        },
        target: 'web',
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.js$/,
                    enforce: 'pre',
                    use: ['source-map-loader'],
                }
            ],
        },
        resolve: {
            plugins: [new TsconfigPathsPlugin()],
            extensions: ['.ts', '.js'],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                chunks: [
                    'renderer'
                ]
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: './src/index.css',
                        to: './index.css'
                    },
                    {
                        from: './src/resources',
                        to: './resources'
                    },
                    {
                        from: '.nojekyll',
                        to: ''
                    }
                ]
            })
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js'
        }
    };
};



