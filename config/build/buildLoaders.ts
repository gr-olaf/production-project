import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoaders } from './loaders/buildCssLoaders';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
	const babelLoader = buildBabelLoader(isDev);

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

	const cssLoader = buildCssLoaders(isDev);

	return [fileLoader, svgLoader, babelLoader, typescriptLoader, cssLoader];
}
