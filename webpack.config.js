var webpack = require('webpack');  
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {  
    entry: [
//	'webpack/hot/only-dev-server',
	"./src/js/app.js"	
    ],
    output: {
        path: __dirname + '/public',
        filename: "bundle.js"
	
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
              { test: /\.less$/, loader: "style!css!less" },
	    
	    { test: /\.(jpe?g|png|gif|svg)$/i,
              loaders: [
		  'file?hash=sha512&digest=hex&name=[hash].[ext]',
		  'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
              ]
	    },
	    { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
	    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" },
	    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
	    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" },
	    { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" }
        ]
    },
    resolve: {
	// you can now require('file') instead of require('file.jsx')
	extensions: ['', '.jsx', '.js', 'less']
    },
    plugins: [
	new webpack.NoErrorsPlugin(),
	new ExtractTextPlugin("[name].css", { allChunks: true })
    ]

};
