import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin';
import { BuildOptions } from '../types/config';

interface BuildBabelLoaderProps extends BuildOptions {
	isTSX?: boolean;
}

export function buildBabelLoader({ isDev, isTSX }: BuildBabelLoaderProps) {
	return {
		test: isTSX ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
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
					[
						'@babel/plugin-transform-typescript',
						{
							isTSX,
						},
					],
					'@babel/plugin-transform-runtime',
					isTSX && [
						babelRemovePropsPlugin,
						{
							props: ['data-testid'],
						},
					],
					isDev && require.resolve('react-refresh/babel'),
				].filter(Boolean),
			},
		},
	};
}
