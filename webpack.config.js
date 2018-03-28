const path  = require('path'),
      multi = require('multi-loader');

module.exports = {
    entry: './assets/js/app.js',
    output: {
        path: path.resolve(__dirname, './public/dist'),
        publicPath: '/dist/',
        filename: 'build.js'
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
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
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
                    // other vue-loader options go here
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
                    path.resolve(__dirname, "./assets/fonts")
                ],
                options: {
                    name: 'fonts/[name].[ext]',
                },
            },
            {
                test: /\.svg$/,
                loader: 'vue-svg-loader', // `vue-svg` for webpack 1.x
                exclude: [
                    path.resolve(__dirname, "./assets/fonts")
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
            '@js': path.resolve(__dirname, './assets/js/'),
            '@img': path.resolve(__dirname, './assets/img/'),
            '@fonts': path.resolve(__dirname, './assets/fonts/'),
            '@sass': path.resolve(__dirname, './assets/sass/'),
            '@components': path.resolve(__dirname, './assets/js/components/'),
            '@modules': path.resolve(__dirname, './assets/js/modules/'),
            'sass': path.resolve(__dirname, './assets/sass/'),
            'mixins': path.resolve(__dirname, './assets/sass/mixins/_mixins.scss'),
            'variables': path.resolve(__dirname, './assets/sass/_variables.scss'),
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
        contentBase: path.resolve(__dirname, './public'),
        port: 9000
    },
    performance: {
        hints: false
    }
}