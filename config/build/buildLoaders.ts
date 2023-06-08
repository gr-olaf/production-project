import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BuildOptions } from './types/config';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
	const babelLoader = {
		test: /\.(js|jsx|ts|tsx)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env'],
				plugins: [
					[
						'i18next-extract',
						{ locales: ['ru', 'en'], keyAsDeafultValue: true },
					],
				],
			},
		},
	};

	const svgLoader = {
		test: /\.svg$/i,
		use: ['@svgr/webpack'],
	};

	const fileLoader = {
		test: /\.(png|jpg|jpeg|gif|woff2|woff)$/i,
		type: 'asset/resource',
	};

	const typescriptLoader = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	};

	const cssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					modules: {
						auto: (resPath: string) => resPath.includes('.module.'),
						localIdentName: isDev
							? '[path][name]__[local]--[hash:base64:5]'
							: '[hash:base64:8]',
					},
				},
			},
			'sass-loader',
		],
	};

	return [fileLoader, svgLoader, babelLoader, typescriptLoader, cssLoader];
}
