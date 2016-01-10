module.exports = {
    entry: "./assets/entry.js",
    output: {
        path: __dirname + '/public',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
              test: /\.css$/,
              loader: "style!css"
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              loaders: [
                  'file?hash=sha512&digest=hex&name=[hash].[ext]',
                  'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
              ]
            },
            {
              test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
              test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: "file-loader"
            }
        ]
    }
};
