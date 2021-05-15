const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const OUTPUT_PATH = path.resolve(__dirname, "dist");

module.exports = {
    entry: './src/index.tsx',
    devtool: 'source-map',
    devServer: {
        contentBase: OUTPUT_PATH,
        compress: true,
        port: 4000,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: OUTPUT_PATH,
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./src/index.html",
    })],
};