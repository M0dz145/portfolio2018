const multi   = require('multi-loader'),
      loaders = require('./loaders'),
      path    = require('path');

module.exports = (config) => {
    if(!config.module) {
        config.module = {};
    }

    config.module.rules = [
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
                path.resolve(__dirname, './../assets/fonts'),
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
                'responsive-loader?name=img/[name].webp?[hash]!webp-loader?{quality: 80}',
                'responsive-loader?name=img/[name].[ext]?[hash]'
            )
        }
    ];
};