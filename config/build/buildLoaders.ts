import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoaders } from './loaders/buildCssLoaders';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
	const { isDev } = options;

	const codeBabelLoader = buildBabelLoader({ ...options, isTSX: false });
	const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTSX: true });

	const svgLoader = {
		test: /\.svg$/i,
		use: [{
			loader: '@svgr/webpack',
			options: {
				icon: true,
				svgoConfig: {
					plugins: [
						{
							name: 'convertColors',
							params: {
								currentColor: true,
							}
						}
					]
			}
			}
		}],
	};

	const fileLoader = {
		test: /\.(png|jpg|jpeg|gif|woff2|woff)$/i,
		type: 'asset/resource',
	};

	// const typescriptLoader = {
	// 	test: /\.tsx?$/,
	// 	use: 'ts-loader',
	// 	exclude: /node_modules/,
	// };

	const cssLoader = buildCssLoaders(isDev);

	return [
		fileLoader,
		svgLoader,
		codeBabelLoader,
		tsxCodeBabelLoader,
		//  typescriptLoader,
		cssLoader,
	];
}
