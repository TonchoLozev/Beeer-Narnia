const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlWebPackPlugin = new HtmlWebPackPlugin({
    template: './index.html',
    filename: 'index.html'
});

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    devtool: 'cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devServer: {
        compress: true,
        port: 1337,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.(ttf|eot|svg|woff)(\?[\s\S]+)?$/,
                use: 'file-loader',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react', 'es2015'],
                        plugins: ['transform-class-properties']
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true }
                    }
                ]
            }
        ]
    },
    plugins: [
        htmlWebPackPlugin
    ]
};
