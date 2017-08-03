var path = require('path');
var webpack = require('webpack');
 
var ROOT_PATH = path.resolve('.');
var APP_PATH = path.resolve( 'src');
var BUILD_PATH = path.resolve('build');
 
//css export to file
var ExtractTextPlugin = require('extract-text-webpack-plugin');
 
//images export to file
// const imagemin = require('imagemin');
// const imageminMozjpeg = require('imagemin-mozjpeg');
//
// imagemin(['./images/*.jpg', './images/*.png'], './images', {
//     use: [imageminMozjpeg()]});
 
module.exports = {
    entry: APP_PATH+'/js/app.js',
    output: {
        path: BUILD_PATH,
        filename: 'js/main.js',
        publicPath: '/'
    },
    devtool: 'source-map',
    watch: true,
    resolve: {
        alias: {
            jquery: APP_PATH+'/js/jquery-1.9.1.min.js',
            jqueryScroll: APP_PATH+'/js/jquery.scrollify.min.js'
        }
    },
    module: {
        loaders: [
            {
                test: /\.scss$/, use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                publicPath: '/',
                use: [
                    {
                        loader: "css-loader", options: {
                        sourceMap: true
                    }
                    }, {
                        loader: "sass-loader", options: {
                            sourceMap: true
                        }
                    }
                    ]
            })
            },
            {
                test: /\.(gif|png|jpg)$/i,
                loaders: [
                    'file-loader?name=/images/[name].[ext]'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=/fonts/[name].[ext]',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "./css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]",
            disable: false,
            allChunks: true
        })
    ]
};