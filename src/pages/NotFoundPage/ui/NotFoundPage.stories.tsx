import type { Meta, StoryObj } from '@storybook/react';

import { NotFoundPage } from './NotFoundPage';
import ThemeDecorator from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const meta: Meta<typeof NotFoundPage> = {
	title: 'pages/NotFoundPage',
	component: NotFoundPage,
	tags: ['autodocs'],
	argTypes: {
		// backgroundColor: { control: 'color' },
	},
};

export default meta;
type Story = StoryObj<typeof NotFoundPage>;

export const Light: Story = {
	args: {},
};

export const Dark: Story = {
	args: {},
	decorators: [
		(Story) => (
			<ThemeDecorator theme={Theme.DARK}>
				<Story />
			</ThemeDecorator>
		),
	],
};
