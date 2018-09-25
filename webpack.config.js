const path                     = require('path'),
      multi                    = require('multi-loader'),
      loaders                  = require('./webpack/loaders'),
      ServiceWorkerCachePlugin = require('./webpack/ServiceWorkerCachePlugin');

module.exports = {
    entry: {
        app: './assets/js/app.ts'
    },
    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: '/',
        filename: '[name].js?[hash]'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax'
                ],
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: true,
                    caseSensitive: true
                }
            },
            {
                test: /\.tsx?$/,
                ...loaders.typeScriptLoader
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    options: {
                        esModule: true,
                    },
                    loaders: {
                        'ts': [
                            loaders.typeScriptLoader
                        ],
                        'scss': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'
                        ],
                        'sass': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(ttf|eot|otf|woff2?|svg)$/,
                loader: 'file-loader',
                include: [
                    path.resolve(__dirname, './assets/fonts'),
                    /node_modules/
                ],
                options: {
                    name: 'fonts/[name].[ext]',
                },
            },
            {
                test: /\.svg$/,
                loader: 'vue-svg-loader', // `vue-svg` for webpack 1.x
                exclude: [
                    path.resolve(__dirname, './assets/fonts')
                ],
                options: {
                    // optional [svgo](https://github.com/svg/svgo) options
                    svgo: {
                        plugins: [
                            {cleanupIDs: false},
                            {removeDoctype: true},
                            {removeComments: true}
                        ]
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: multi(
                    'responsive-loader?name=img/[name].[hash].webp!webp-loader?{quality: 80}',
                    'responsive-loader?name=img/[name].[hash].[ext]'
                )
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',

            '@components': path.resolve(__dirname, './assets/js/components/'),
            '@modules': path.resolve(__dirname, './assets/js/modules/'),
            '@fonts': path.resolve(__dirname, './assets/fonts/'),
            '@sass': path.resolve(__dirname, './assets/sass/'),
            '@img': path.resolve(__dirname, './assets/img/'),
            '@js': path.resolve(__dirname, './assets/js/'),

            'mixins': path.resolve(__dirname, './assets/sass/mixins/_mixins.scss'),
            'variables': path.resolve(__dirname, './assets/sass/_variables.scss'),
            'sass': path.resolve(__dirname, './assets/sass/'),
        },
        extensions: ['.vue', '.ts', '.tsx', '.js', '.json', '.scss', '.html']
    },
    devServer: {
        contentBase: path.resolve(__dirname, './public'),
        port: 9000,
        historyApiFallback: true,
        stats: {
            modules: false
        }
    },
    performance: {
        hints: false,
    },
    stats: {
        colors: true
    },
    plugins: [
        ServiceWorkerCachePlugin
    ]
};