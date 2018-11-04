const path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {

	var extractPlugin = new ExtractTextPlugin({
		filename: 'styles/main.css',
		ignoreOrder: false
	});

	return {

		devServer: {
			contentBase: "./src",
			inline: true,
			historyApiFallback: true
		},
	
		entry: './src/index.js',
	
		output: {
			path: path.resolve(__dirname, 'public'),  
			filename: 'main.min.js',
			publicPath: '/public/'
		},

		module: {
			rules: [
				{
					test: /\.js?$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: ['react', 'es2015', 'stage-0']
							}
						}
					]
				},{
					test: /\.scss$/,
					use: extractPlugin.extract({
						use: ['css-loader', 'sass-loader']
					})
				}, {
					test: /\.(png|woff|eot|ttf|svg|gif)$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 8192,
								name: '[name].[ext]',
								outputPath: 'images/',
								publicPath: '../images/'
							}
						}
					]
				}
			]
		  },
		  
		  plugins: [
			  extractPlugin
		  ]
	}
}
	