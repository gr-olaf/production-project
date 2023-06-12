import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './Loader';
import ThemeDecorator from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const meta: Meta<typeof Loader> = {
	title: 'shared/Loader',
	component: Loader,
	tags: ['autodocs'],
	argTypes: {
		// backgroundColor: { control: 'color' },
	},
};

export default meta;
type Story = StoryObj<typeof Loader>;

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
