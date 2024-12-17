const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

module.exports = {
	// mode: 'development',
	entry: {
		main: path.join(__dirname, 'src', 'bizindex.js'),
		parallax: path.join(__dirname, 'src', 'bizallax.js'),
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].[contenthash:8].js',
		assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			// {
			// 	test: /\.pug$/,
			// 	loader: 'pug-loader',
			// },
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'],
			},
			{
				test: /\.(woff2?|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: path.join('fonts', '[name][ext]').replace(/\\/g, '/'),
				},
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.svg$/,
				type: 'asset/resource',
				generator: {
					filename: path.join('icons', '[name].[contenthash][ext]'),
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			// title: 'Быстрый запуск Webpack',
			// template: path.resolve(__dirname, './src/template/inner_page_1.html'), // шаблон
			template: path.join(__dirname, 'src', 'template', 'slider.html'),
			chunks: ['main'],
			// template: path.join(__dirname, 'src', 'template_pug', 'inner_page_1.pug'),
			filename: 'slider.html', // название выходного файла
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'template', 'parallax.html'),
			chunks: ['parallax'],
			filename: 'parallax.html', // название выходного файла
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'template', 'biziboard.html'),
			chunks: ['main'],
			filename: 'biziboard.html', // название выходного файла
		}),
		new FileManagerPlugin({
			events: {
				onStart: {
					delete: ['dist'],
				},
			},
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
	],
	optimization: {
		minimizer: [
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						plugins: [
							['gifsicle', { interlaced: true }],
							['jpegtran', { progressive: true }],
							['optipng', { optimizationLevel: 5 }],
							['svgo', { name: 'preset-default' }],
						],
					},
				},
			}),
		],
	},
}