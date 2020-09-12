const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ['./scripts', './scripts/index.js'],
    output: {
        filename: 'app.bundle.js',
        path: path.join(__dirname, 'public', 'assets')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: { url: false, sourceMap: true }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images'
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'index.css'
        })
    ],
    devServer: {
        historyApiFallback: true,
        publicPath: './public/assets',
        contentBase: './public',
        // hot: true,
        watchContentBase: true,
        writeToDisk: true,
        port: 5013
    }
};
