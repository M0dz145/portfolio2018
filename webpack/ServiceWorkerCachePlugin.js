const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = new SWPrecacheWebpackPlugin({
    filename: 'service-worker.js',
    minify: false,
    stripPrefixMulti: {
        'public/': '/'
    },
    staticFileGlobs: [
        'public/**/*.*'
    ],
});
