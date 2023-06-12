import React from 'react';
import type { Preview } from '@storybook/react';
import StyleDecorator from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import ThemeDecorator from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import RouterDecorator from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { Theme } from '../../src/app/providers/ThemeProvider';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
	decorators: [
		(Story) => (
			<StyleDecorator>
				<Story />
			</StyleDecorator>
		),
		(Story) => (
			<ThemeDecorator theme={Theme.LIGHT}>
				<Story />
			</ThemeDecorator>
		),
		(Story) => (
			<RouterDecorator>
				<Story />
			</RouterDecorator>
		),
	],
};

export default preview;
