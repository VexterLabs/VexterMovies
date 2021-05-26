const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const CopyPlugin = require('copy-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production'
const CopyWebpackPlugin=require('copy-webpack-plugin');
const CDNPathRest = require("./cdn-path-reset");
module.exports = {
    devtool: isProd ? false : '#cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            'public': path.resolve(__dirname, '../public'),
            '@': path.resolve(__dirname, '../src')
        },
        extensions: ['.js', '.vue', '.json']

    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,

            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
            {
                test: /\.scss?$/,
                use: isProd ?
                    ExtractTextPlugin.extract({
                        use: [{
                                loader: 'css-loader',
                                options: { minimize: true }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    ident: 'postcss',
                                    plugins: [
                                        require('postcss-cssnext')(),
                                        require('cssnano')()
                                    ]
                                }
                            },
                            'sass-loader'
                        ],
                        fallback: 'vue-style-loader'
                    }) : ['vue-style-loader', 'css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('postcss-cssnext')(),
                                require('cssnano')()
                            ]
                        }
                    }, 'sass-loader']
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, //处理字体文件
                loader: 'url-loader',
                options: {
                    publicPath: '/dist',
                    limit: 10000,
                    name: '/fonts/[name].[hash:8].[ext]'
                }
            },
        ]
    },
    performance: {
        hints: false
    },
    plugins: isProd ? [
        new VueLoaderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
            filename: 'common.[chunkhash].css'
        }),
        
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static/sw.js'),
                to: path.resolve(__dirname, '../dist'),
            }
        ]),
        new CopyWebpackPlugin([
            {
            from: path.resolve(__dirname, '../static'),
            to: path.resolve(__dirname, '../dist/static'),
            ignore: ['.*']
            },
        ]),
        
        new CDNPathRest(isProd)
    ] : [
        new VueLoaderPlugin(),
        new FriendlyErrorsPlugin(),
        // copy custom static assets
        new CopyPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: 'static',
            ignore: ['.*']
        }])
    ]
}