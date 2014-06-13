var webpack = require('webpack');

module.exports = {
    cache: true,

    // entry points
    // the key will be the filename in /assets/js/
    entry: {
        index: './src/assets/js/index.js'
    },

    devtool: 'source-map',
    output: {
        path: "./assets/js/",
        publicPath: "/assets/js/",
        filename: "[name].js"
    },
    resolve: {
        modulesDirectories: ["./node_modules", "./bower_components"],
        extensions: ["", ".coffee", ".js"]
    },
    module: {
        // auto-loaders
        loaders: [
            { test: /\.coffee/, loader: "coffee-loader" }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )
    ]
};
