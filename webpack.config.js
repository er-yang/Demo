var webpack = require('webpack');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin'); //自动打开浏览器插件
module.exports = {
    // 配置服务器
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        contentBase: "./", //最好写上，否则报错，难道这里是一个坑？
        port: 8001
    },
    // 配置入口
    entry: {
        pages: __dirname + '/index.js'
            /*,
            vendors: ['react', 'react-dom']*/ //第三方库和框架
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist/',
        filename: 'js/bundle.js',
        chunkFilename: 'js/chunk/[name].chunk.js'
    },
    module: {
        rules: [

            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },

            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                use: 'url-loader'
            } //url loader相当于一个文件加载器返回一个dataURL
        ]
    },
    //解析的扩展名
    resolve: {
        extensions: ['.js', '.jsx', 'jpg'],
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendors',
        //     filename: 'js/vendors.js'
        // }),
        //new ExtractTextPlugin("css/bundle.css"),
        // 如需jquery请解锁
        // new webpack.ProvidePlugin({ $: "jquery" }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({
            url: 'http://localhost:8001'
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
        // new HtmlWebpackPlugin({
        //   template: 'index.html'
        //   })
    ]
};