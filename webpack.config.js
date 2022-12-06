const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const exec = require('child_process').exec;

module.exports = (env) => {
    process.env.PROFILE = env.profile || 'prod';

    return {
        mode: 'development',
        entry: {
            main: './src/main.ts',
            renderer: './src/renderer.ts',
        },
        target: 'electron-main',
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
                        from: './src/splash-art.html',
                        to: './splash-art.html'
                    },
                    {
                        from: './src/index.css',
                        to: './index.css'
                    },
                    {
                        from: './src/resources',
                        to: './resources'
                    }
                ]
            }),
            {
                apply: compiler => {
                    let run = false;
                    compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
                        if (run === false) {
                            exec('electron ./dist/main.js');
                            run = true;
                        }
                    });
                }
            }
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js'
        }
    };
};



