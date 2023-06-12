import type { Meta, StoryObj } from '@storybook/react';

import { Button, ThemeButton } from './Button';
import ThemeDecorator from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const meta: Meta<typeof Button> = {
	title: 'shared/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		// backgroundColor: { control: 'color' },
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		children: 'Text',
	},
};

export const Clear: Story = {
	args: {
		children: 'Text',
		theme: ThemeButton.CLEAR,
	},
};

export const Outline: Story = {
	args: {
		children: 'Text',
		theme: ThemeButton.OUTLINE,
	},
};

export const OutlineDark: Story = {
	args: {
		children: 'Text',
		theme: ThemeButton.OUTLINE,
	},
	decorators: [
		(Story) => (
			<ThemeDecorator theme={Theme.DARK}>
				<Story />
			</ThemeDecorator>
		),
	],
};
